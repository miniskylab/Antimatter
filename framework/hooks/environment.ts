import "@expo/match-media";
import {useEffect, useState} from "react";
import {ImageStyle, Platform, TextStyle, ViewStyle} from "react-native";
import {MediaQueryAllQueryable, useMediaQuery} from "react-responsive";
import {getScreenSizeInPixel, isEnvironment} from "../functions";
import {Breakpoint, PlatformEnvironment, ResponsiveEnvironment} from "../types";

export function useEnvironment(environment: ResponsiveEnvironment | PlatformEnvironment): boolean
{
    switch (environment)
    {
        case "MobileApp":
            return (Platform.OS === "ios" || Platform.OS === "android") &&
                   useSsrSupportedMediaQuery({maxWidth: getScreenSizeInPixel("Medium")});

        case "MobileWeb":
            return Platform.OS === "web" &&
                   useSsrSupportedMediaQuery({maxWidth: getScreenSizeInPixel("Medium")});

        case "TabletApp":
            return (Platform.OS === "ios" || Platform.OS === "android") &&
                   useSsrSupportedMediaQuery({
                       minWidth: getScreenSizeInPixel("Medium"),
                       maxWidth: getScreenSizeInPixel("Large")
                   });

        case "TabletWeb":
            return (Platform.OS === "web") &&
                   useSsrSupportedMediaQuery({
                       minWidth: getScreenSizeInPixel("Medium"),
                       maxWidth: getScreenSizeInPixel("Large")
                   });

        case "DesktopWeb":
            return Platform.OS === "web" &&
                   useSsrSupportedMediaQuery({minWidth: getScreenSizeInPixel("Large")});

        case "NativeApp":
        case "WebBrowser":
        case "WebSSR":
        case "Web":
            return isEnvironment(environment);

        default:
            return false;
    }
}

export function useBreakpoint(breakpoint: Breakpoint): boolean
{
    return useSsrSupportedMediaQuery({minWidth: getScreenSizeInPixel(breakpoint)});
}

export function useResponsiveStyle(breakpoint: Breakpoint, style: ViewStyle | TextStyle | ImageStyle): typeof style
{
    const mediaQueryMatched = useMediaQuery({minWidth: getScreenSizeInPixel(breakpoint)});
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

export function useSuspense(): ViewStyle & TextStyle & ImageStyle
{
    if (ssrIsEnabled())
    {
        const [componentDidMount, setComponentDidMount] = useState(false);
        useEffect(() => { setComponentDidMount(true); }, []);

        return componentDidMount
            ? {}
            : {display: "none"};
    }

    return isEnvironment("NativeApp") || isEnvironment("WebBrowser")
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
    return isEnvironment("WebBrowser") && !!(window as never)?.["ANTIMATTER"]?.["ssr"];
}
