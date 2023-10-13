import "@expo/match-media";
import {useEffect, useState} from "react";
import {ImageStyle, Platform, TextStyle, ViewStyle} from "react-native";
import {MediaQueryAllQueryable, useMediaQuery} from "react-responsive";
import type {Breakpoint, PlatformEnvironment, ResponsiveEnvironment} from "./types";

export function is(environment: PlatformEnvironment): boolean
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

export function use(environment: ResponsiveEnvironment | PlatformEnvironment): boolean
{
    switch (environment)
    {
        case "MobileApp":
            return (Platform.OS === "ios" || Platform.OS === "android") &&
                   useSsrSupportedMediaQuery({maxWidth: ScreenSize("Medium")});

        case "MobileWeb":
            return Platform.OS === "web" &&
                   useSsrSupportedMediaQuery({maxWidth: ScreenSize("Medium")});

        case "TabletApp":
            return (Platform.OS === "ios" || Platform.OS === "android") &&
                   useSsrSupportedMediaQuery({minWidth: ScreenSize("Medium"), maxWidth: ScreenSize("Large")});

        case "TabletWeb":
            return (Platform.OS === "web") &&
                   useSsrSupportedMediaQuery({minWidth: ScreenSize("Medium"), maxWidth: ScreenSize("Large")});

        case "DesktopWeb":
            return Platform.OS === "web" &&
                   useSsrSupportedMediaQuery({minWidth: ScreenSize("Large")});

        case "NativeApp":
        case "WebBrowser":
        case "WebSSR":
        case "Web":
            return is(environment);

        default:
            return false;
    }
}

export function useBreakpoint(breakpoint: Breakpoint): boolean
{
    return useSsrSupportedMediaQuery({minWidth: ScreenSize(breakpoint)});
}

export function useResponsiveStyle(breakpoint: Breakpoint, style: ViewStyle | TextStyle | ImageStyle): typeof style
{
    const mediaQueryMatched = useMediaQuery({minWidth: ScreenSize(breakpoint)});
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

    return is("NativeApp") || is("WebBrowser")
        ? {}
        : {display: "none"};
}

export function ScreenSize(breakpoint: Breakpoint): number
{
    switch (breakpoint)
    {
        case "Small":
            return 576;

        case "Medium":
            return 769;

        case "Large":
            return 1025;

        case "ExtraLarge":
            return 1200;
    }
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
    return is("WebBrowser") && !!(window as never)?.["ANTIMATTER"]?.["ssr"];
}
