import AsyncStorage from "@react-native-async-storage/async-storage";
import Base64JS from "base64-js";
import CryptoJS from "crypto-js";
import * as AuthSession from "expo-auth-session";
import * as ExpoCrypto from "expo-crypto";
import * as ExpoSecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import {useRef, useState} from "react";
import {base64UrlEncode, extractQueryParameter} from "../extensions";

export const Authentication = new class
{
    private readonly TOKEN_STORAGE_KEY = "MINISKYLAB_TOKEN";
    private readonly AES_SECRET_STORAGE_KEY = "MINISKYLAB_SECURE_STORAGE_AES_SECRET";

    private clientId: string;
    private discovery: AuthSession.DiscoveryDocument;

    useAuthentication(issuer: string, clientId: string, mobileAppScheme: string): boolean
    {
        this.clientId = clientId;
        this.discovery = AuthSession.useAutoDiscovery(issuer);

        const ref = useRef<Ref>({});
        const [codeChallenge, setCodeChallenge] = useState<string>();
        const [authenticationComplete, setAuthenticationComplete] = useState(false);
        const [authorizationResponse, setAuthorizationResponse] = useState<WebBrowser.WebBrowserAuthSessionResult>();

        if (authenticationComplete)
        {
            return true;
        }

        if (!ref.current.codeVerifier && !codeChallenge)
        {
            ref.current.codeVerifier = Base64JS.fromByteArray(ExpoCrypto.getRandomBytes(1024));
            ExpoCrypto.digestStringAsync(
                ExpoCrypto.CryptoDigestAlgorithm.SHA256,
                ref.current.codeVerifier,
                {encoding: ExpoCrypto.CryptoEncoding.BASE64}
            ).then(codeChallenge =>
            {
                setCodeChallenge(base64UrlEncode(codeChallenge));
            });
        }

        if (!this.discovery || !codeChallenge)
        {
            return false;
        }

        const redirectUri = AuthSession.makeRedirectUri({scheme: mobileAppScheme, preferLocalhost: true, isTripleSlashed: true});
        const scope = ["openid", "profile", "offline_access"];
        const authorizationRequestUrl = `${this.discovery.authorizationEndpoint}?`
                                        + "response_type=code&"
                                        + "code_challenge_method=S256&"
                                        + `code_challenge=${codeChallenge}&`
                                        + `client_id=${this.clientId}&`
                                        + `redirect_uri=${redirectUri}&`
                                        + `scope=${scope.join("%20")}`;

        if (authorizationResponse?.type === "success")
        {
            const authorizationCode = extractQueryParameter(authorizationResponse.url)["code"];
            AuthSession.exchangeCodeAsync(
                {
                    extraParams: {code_verifier: ref.current.codeVerifier},
                    code: authorizationCode,
                    redirectUri,
                    clientId
                },
                this.discovery
            ).then(tokenResponse =>
            {
                this.storeTokenAsync({
                    idToken: tokenResponse.idToken,
                    accessToken: tokenResponse.accessToken,
                    refreshToken: tokenResponse.refreshToken
                }).then(() =>
                {
                    setAuthenticationComplete(true);
                });
            });
        }
        else
        {
            WebBrowser.openAuthSessionAsync(authorizationRequestUrl, redirectUri)
                .then(authorizationResponse =>
                {
                    setAuthorizationResponse(authorizationResponse);
                });
        }

        return false;
    }

    async storeTokenAsync(token: Token): Promise<void>
    {
        if (!token)
        {
            throw new Error("Couldn't store null or undefined token");
        }

        let aesSecret = await ExpoSecureStore.getItemAsync(this.AES_SECRET_STORAGE_KEY);
        if (!aesSecret)
        {
            aesSecret = Base64JS.fromByteArray(ExpoCrypto.getRandomBytes(1024));
            await ExpoSecureStore.setItemAsync(this.AES_SECRET_STORAGE_KEY, aesSecret);
        }

        const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(token), aesSecret).toString();
        return AsyncStorage.setItem(this.TOKEN_STORAGE_KEY, encryptedValue);
    }

    async retrieveTokenAsync(): Promise<Token>
    {
        const encryptedValue = await AsyncStorage.getItem(this.TOKEN_STORAGE_KEY);
        if (!encryptedValue)
        {
            return null;
        }

        const aesSecret = await ExpoSecureStore.getItemAsync(this.AES_SECRET_STORAGE_KEY);
        return JSON.parse(CryptoJS.AES.decrypt(encryptedValue, aesSecret).toString(CryptoJS.enc.Utf8));
    }

    async refreshTokenAsync(): Promise<void>
    {
        const {refreshToken} = await this.retrieveTokenAsync();
        if (!refreshToken)
        {
            throw new Error("No refresh token found while attempting to refresh access token");
        }

        const tokenResponse = await AuthSession.refreshAsync(
            {
                refreshToken,
                clientId: this.clientId
            },
            this.discovery
        );

        await this.storeTokenAsync({
            idToken: tokenResponse.idToken,
            accessToken: tokenResponse.accessToken,
            refreshToken: tokenResponse.refreshToken
        });
    }
};

type Token = {
    readonly idToken: string;
    readonly accessToken: string;
    readonly refreshToken: string;
};

type Ref = {
    codeVerifier?: string;
}
