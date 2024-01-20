import "react-native-get-random-values";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Base64JS from "base64-js";
import CryptoJS from "crypto-js";
import * as AuthSession from "expo-auth-session";
import * as ExpoCrypto from "expo-crypto";
import * as ExpoSecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import {useEffect, useRef, useState} from "react";
import {isEnvironment, Ts} from "../functions";

export class NativeAuthentication
{
    private readonly TOKEN_STORAGE_KEY = "MINISKYLAB_TOKEN";
    private readonly AES_SECRET_STORAGE_KEY = "MINISKYLAB_AES_SECRET";

    private readonly issuer: string;
    private readonly clientId: string;
    private tokenRefreshTask: Promise<void> | undefined;

    constructor(issuer: string, clientId: string)
    {
        if (isEnvironment("Web"))
        {
            throw new Error("NativeAuthentication cannot be used inside web environment");
        }

        this.issuer = issuer;
        this.clientId = clientId;
    }

    useAuthentication(mobileAppScheme: string): [boolean, (() => void)?]
    {
        const scope = ["openid", "profile", "offline_access"];
        const redirectUri = AuthSession.makeRedirectUri({scheme: mobileAppScheme, preferLocalhost: true, isTripleSlashed: true});

        const ref = useRef<Ref>({});
        const discovery = AuthSession.useAutoDiscovery(this.issuer);
        const [codeChallenge, setCodeChallenge] = useState<string>();
        const [tokenAcquired, setTokenAcquired] = useState(false);
        const [authorizationResponse, setAuthorizationResponse] = useState<WebBrowser.WebBrowserAuthSessionResult>();

        useEffect(() =>
        {
            if (tokenAcquired)
            {
                return;
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
                    setCodeChallenge(Ts.String.base64UrlEncode(codeChallenge));
                });
            }

            if (discovery && ref.current.codeVerifier && authorizationResponse?.type === "success")
            {
                const authorizationCode = Ts.String.extractQueryParameter(authorizationResponse.url)["code"];
                if (!authorizationCode)
                {
                    return;
                }

                AuthSession.exchangeCodeAsync(
                    {
                        extraParams: {code_verifier: ref.current.codeVerifier},
                        code: authorizationCode,
                        clientId: this.clientId,
                        redirectUri
                    },
                    discovery
                ).then(tokenResponse =>
                {
                    this.storeTokenAsync({
                        idToken: tokenResponse.idToken,
                        accessToken: tokenResponse.accessToken,
                        refreshToken: tokenResponse.refreshToken
                    }).then(() =>
                    {
                        setTokenAcquired(true);
                    });
                });
            }
        });

        if (!discovery || !codeChallenge)
        {
            return [false];
        }

        const openWebBrowserForUserToLogin = () =>
        {
            const authorizationRequestUrl = `${discovery.authorizationEndpoint}?`
                                            + "response_type=code&"
                                            + "code_challenge_method=S256&"
                                            + `code_challenge=${codeChallenge}&`
                                            + `client_id=${this.clientId}&`
                                            + `redirect_uri=${redirectUri}&`
                                            + `scope=${scope.join("%20")}`;

            WebBrowser.openAuthSessionAsync(authorizationRequestUrl, redirectUri)
                .then(authorizationResponse =>
                {
                    setAuthorizationResponse(authorizationResponse);
                });
        };

        return [tokenAcquired, openWebBrowserForUserToLogin];
    }

    async hasTokenAsync(): Promise<boolean>
    {
        const token = await this.retrieveTokenAsync();
        return !!token?.accessToken && !!token?.refreshToken && !!token?.idToken;
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
        await AsyncStorage.setItem(this.TOKEN_STORAGE_KEY, encryptedValue);
    }

    async retrieveTokenAsync(): Promise<Token>
    {
        const encryptedValue = await AsyncStorage.getItem(this.TOKEN_STORAGE_KEY);
        if (!encryptedValue)
        {
            return {
                accessToken: undefined,
                refreshToken: undefined,
                idToken: undefined
            };
        }

        const aesSecret = await ExpoSecureStore.getItemAsync(this.AES_SECRET_STORAGE_KEY);
        Ts.Error.throwIfNullOrUndefined(aesSecret);

        return JSON.parse(CryptoJS.AES.decrypt(encryptedValue, aesSecret).toString(CryptoJS.enc.Utf8));
    }

    async refreshTokenAsync(): Promise<void>
    {
        if (this.tokenRefreshTask)
        {
            await this.tokenRefreshTask;
            this.tokenRefreshTask = undefined;

            return;
        }

        this.tokenRefreshTask = new Promise(async (resolve, reject) =>
        {
            try
            {
                const {refreshToken} = await this.retrieveTokenAsync();
                const discovery = await AuthSession.fetchDiscoveryAsync(this.issuer);

                const tokenResponse = await AuthSession.refreshAsync(
                    {
                        refreshToken,
                        clientId: this.clientId
                    },
                    discovery
                );

                await this.storeTokenAsync({
                    idToken: tokenResponse.idToken,
                    accessToken: tokenResponse.accessToken,
                    refreshToken: tokenResponse.refreshToken
                });

                resolve();
            }
            catch (error)
            {
                reject(error);
            }
        });
    }
}

type Token = {
    readonly idToken: string | undefined;
    readonly accessToken: string | undefined;
    readonly refreshToken: string | undefined;
};

type Ref = {
    codeVerifier?: string;
}
