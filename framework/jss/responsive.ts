import "@expo/match-media";
import {Platform} from "react-native";
import {useMediaQuery} from "react-responsive";

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
    return useMediaQuery({minWidth: screenSize});
}

export function useEnvironment(environment: Environment): boolean
{
    switch (environment)
    {
        case Environment.MobileApp:
            return (Platform.OS === "ios" || Platform.OS === "android") &&
                   useMediaQuery({maxWidth: ScreenSize.Medium});

        case Environment.MobileWeb:
            return Platform.OS === "web" &&
                   useMediaQuery({maxWidth: ScreenSize.Medium});

        case Environment.TabletApp:
            return (Platform.OS === "ios" || Platform.OS === "android") &&
                   useMediaQuery({minWidth: ScreenSize.Medium, maxWidth: ScreenSize.Large});

        case Environment.TabletWeb:
            return (Platform.OS === "web") &&
                   useMediaQuery({minWidth: ScreenSize.Medium, maxWidth: ScreenSize.Large});

        case Environment.DesktopWeb:
            return Platform.OS === "web" &&
                   useMediaQuery({minWidth: ScreenSize.Large});

        case Environment.App:
            return Platform.OS === "ios" || Platform.OS === "android";

        case Environment.Web:
            return Platform.OS === "web";

        default:
            return false;
    }
}
