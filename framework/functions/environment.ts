import {Platform} from "react-native";
import type {PlatformEnvironment} from "../types";

export function isEnvironment(environment: PlatformEnvironment): boolean
{
    switch (environment)
    {
        case "NativeApp":
            return Platform.OS === "ios" || Platform.OS === "android";

        case "WebBrowser":
            return Platform.OS === "web" && !!(typeof window !== "undefined" && window.document && window.document.createElement);

        case "WebSSR":
            return Platform.OS === "web" && typeof window === "undefined";

        case "Web":
            return Platform.OS === "web";

        default:
            return false;
    }
}
