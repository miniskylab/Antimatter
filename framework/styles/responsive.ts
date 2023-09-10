import "@expo/match-media";
import {useEffect, useState} from "react";
import {Platform} from "react-native";
import {MediaQueryAllQueryable, useMediaQuery} from "react-responsive";

export enum ScreenSize
{
    Small = 576,
    Medium = 769,
    Large = 1025,
    ExtraLarge = 1200
}

export enum Environment
{
    MobileApp = "MobileApp",
    MobileWeb = "MobileWeb",
    TabletApp = "TabletApp",
    TabletWeb = "TabletWeb",
    DesktopWeb = "DesktopWeb",
    App = "App",
    Web = "Web",
}

export function useScreenSize(screenSize: ScreenSize): boolean
{
    return useSsrSupportedMediaQuery({minWidth: screenSize});
}

export function useEnvironment(environment: Environment): boolean
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

        case Environment.App:
            return Platform.OS === "ios" || Platform.OS === "android";

        case Environment.Web:
            return Platform.OS === "web";

        default:
            return false;
    }
}

function useSsrSupportedMediaQuery(settings: MediaQueryAllQueryable): boolean
{
    const ssrIsEnabled = typeof window !== "undefined" && !!(window as never)?.["ANTIMATTER"]?.["ssr"];
    if (ssrIsEnabled)
    {
        const [componentDidMount, setComponentDidMount] = useState(false);
        useEffect(() => { setComponentDidMount(true); }, []);

        return componentDidMount
            ? useMediaQuery(settings)
            : useMediaQuery({all: false});
    }

    return useMediaQuery(settings);
}
