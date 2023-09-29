import AsyncStorage from "@react-native-async-storage/async-storage";
import Base64JS from "base64-js";
import CryptoJS from "crypto-js";
import * as AuthSession from "expo-auth-session";
import * as ExpoCrypto from "expo-crypto";
import * as ExpoSecureStore from "expo-secure-store";
import {useState} from "react";

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

        const redirectUri = AuthSession.makeRedirectUri({
            scheme: mobileAppScheme,
            preferLocalhost: true,
            isTripleSlashed: true
        });

        const [authenticationComplete, setAuthenticationComplete] = useState(false);
        const [authRequest, codeResponse, promptAsync] = AuthSession.useAuthRequest(
            {
                clientId,
                redirectUri,
                scopes: ["openid", "profile", "offline_access"]
            },
            this.discovery
        );

        if (authenticationComplete)
        {
            return true;
        }

        if (!this.discovery || !authRequest)
        {
            return false;
        }

        if (codeResponse?.type === "success")
        {
            AuthSession.exchangeCodeAsync(
                {
                    extraParams: {code_verifier: authRequest.codeVerifier},
                    code: codeResponse.params.code,
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
            promptAsync();
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
