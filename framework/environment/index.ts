import "@expo/match-media";
import {useEffect, useState} from "react";
import {ImageStyle, Platform, TextStyle, ViewStyle} from "react-native";
import {MediaQueryAllQueryable, useMediaQuery} from "react-responsive";
import {PlatformEnvironment} from "./platform-environment";
import {ResponsiveEnvironment} from "./responsive-environment";
import {ScreenSize} from "./screen-size";

export {ScreenSize};
export const Environment = {...ResponsiveEnvironment, ...PlatformEnvironment};

export function isEnvironment(environment: PlatformEnvironment): boolean
{
    switch (environment)
    {
        case PlatformEnvironment.NativeApp:
            return Platform.OS === "ios" || Platform.OS === "android";

        case PlatformEnvironment.WebBrowser:
            return Platform.OS === "web" && !!(typeof window !== "undefined" && window.document && window.document.createElement);

        case PlatformEnvironment.WebSSR:
            return Platform.OS === "web" && typeof window === "undefined";

        case PlatformEnvironment.Web:
            return Platform.OS === "web";

        default:
            return false;
    }
}

export function useEnvironment(environment: ResponsiveEnvironment | PlatformEnvironment): boolean
{
    switch (environment)
    {
        case Environment.MobileApp:
            return (Platform.OS === "ios" || Platform.OS === "android") &&
                   useSsrSupportedMediaQuery({maxWidth: ScreenSize.Medium});

        case Environment.MobileWeb:
            return Platform.OS === "web" &&
                   useSsrSupportedMediaQuery({maxWidth: ScreenSize.Medium});

        case Environment.TabletApp:
            return (Platform.OS === "ios" || Platform.OS === "android") &&
                   useSsrSupportedMediaQuery({minWidth: ScreenSize.Medium, maxWidth: ScreenSize.Large});

        case Environment.TabletWeb:
            return (Platform.OS === "web") &&
                   useSsrSupportedMediaQuery({minWidth: ScreenSize.Medium, maxWidth: ScreenSize.Large});

        case Environment.DesktopWeb:
            return Platform.OS === "web" &&
                   useSsrSupportedMediaQuery({minWidth: ScreenSize.Large});

        case Environment.NativeApp:
        case Environment.WebBrowser:
        case Environment.WebSSR:
        case Environment.Web:
            return isEnvironment(environment);

        default:
            return false;
    }
}

export function useScreenSize(screenSize: ScreenSize): boolean
{
    return useSsrSupportedMediaQuery({minWidth: screenSize});
}

export function useResponsiveStyle(screenSize: ScreenSize, style: ViewStyle | TextStyle | ImageStyle): typeof style
{
    const mediaQueryMatched = useMediaQuery({minWidth: screenSize});
    if (ssrIsEnabled())
    {
        const [componentDidMount, setComponentDidMount] = useState(false);
        useEffect(() => { setComponentDidMount(true); }, []);

        return componentDidMount
            ? mediaQueryMatched ? style : {}
            : {};
    }

    return mediaQueryMatched ? style : {};
}

export function useSsrVisibleWhenReady(): ViewStyle & TextStyle & ImageStyle
{
    if (ssrIsEnabled())
    {
        const [componentDidMount, setComponentDidMount] = useState(false);
        useEffect(() => { setComponentDidMount(true); }, []);

        return componentDidMount
            ? {}
            : {display: "none"};
    }

    return useEnvironment(Environment.NativeApp) || useEnvironment(Environment.WebBrowser)
        ? {}
        : {display: "none"};
}

function useSsrSupportedMediaQuery(settings: MediaQueryAllQueryable): boolean
{
    if (ssrIsEnabled())
    {
        const [componentDidMount, setComponentDidMount] = useState(false);
        useEffect(() => { setComponentDidMount(true); }, []);

        return componentDidMount
            ? useMediaQuery(settings)
            : useMediaQuery({all: false});
    }

    return useMediaQuery(settings);
}

function ssrIsEnabled(): boolean
{
    return isEnvironment(PlatformEnvironment.WebBrowser) && !!(window as never)?.["ANTIMATTER"]?.["ssr"];
}
