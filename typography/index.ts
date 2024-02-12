import {EMPTY_STRING, isEnvironment, ssrIsEnabled} from "@miniskylab/antimatter-framework";
import {useEffect, useState} from "react";
import {ImageStyle, TextStyle, ViewStyle} from "react-native";
import {useRobotoFont} from "./font";
import {IcomoonSettings, useDefaultIconSet} from "./icomoon";

export {DefaultIconSet} from "./icomoon";

export function useIcomoon(): IcomoonSettings
{
    return useDefaultIconSet();
}

type Typography = { fontFamily?: string; fontWeight?: TextStyle["fontWeight"]; fontStyle?: TextStyle["fontStyle"]; }
export function useTypography<TStyle extends TextStyle>(style?: TStyle): Typography | undefined
{
    const fontLoaded = useRobotoFont();
    const [iconLoaded, , glyphName] = useDefaultIconSet();
    if (!fontLoaded || !iconLoaded)
    {
        return undefined;
    }

    let fontStyleSuffix;
    switch (style?.fontStyle)
    {
        case "italic":
            fontStyleSuffix = "-Italic";
            break;

        case "normal":
        default:
            fontStyleSuffix = EMPTY_STRING;
            break;
    }

    let fontWeightSuffix;
    switch (style?.fontWeight)
    {
        case "100":
        case "200":
            fontWeightSuffix = "-Thin";
            break;

        case "300":
            fontWeightSuffix = "-Light";
            break;

        case "400":
            fontWeightSuffix = "-Regular";
            break;

        case "500":
        case "600":
            fontWeightSuffix = "-Medium";
            break;

        case "bold":
        case "700":
        case "800":
            fontWeightSuffix = "-Bold";
            break;

        case "900":
            fontWeightSuffix = "-Black";
            break;

        case "normal":
        default:
            fontWeightSuffix = "-Regular";
            break;
    }

    let fontFamily = `Roboto${fontWeightSuffix}${fontStyleSuffix}`;
    if (isEnvironment("Web"))
    {
        fontFamily += `, sans-serif, ${glyphName}`;
    }

    return {
        fontFamily,
        fontWeight: "normal",
        fontStyle: "normal"
    };
}

export function useSuspense(): ViewStyle & TextStyle & ImageStyle
{
    const [componentDidMount, setComponentDidMount] = useState(false);
    useEffect(() => { setComponentDidMount(true); }, []);

    if (ssrIsEnabled())
    {
        const typographyLoaded = !!useTypography();
        return componentDidMount && typographyLoaded
            ? {}
            : {display: "none"};
    }

    return isEnvironment("NativeApp") || isEnvironment("WebBrowser")
        ? {}
        : {display: "none"};
}
