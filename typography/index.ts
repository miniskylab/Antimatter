import {EMPTY_STRING, Environment, isEnvironment} from "@miniskylab/antimatter-framework";
import {TextStyle} from "react-native";
import {useRobotoFont} from "./font";
import {IcomoonSettings, useDefaultIconSet} from "./icomoon";

export function useIcomoon(): IcomoonSettings
{
    return useDefaultIconSet();
}

type Typography = { fontFamily?: string; fontWeight?: TextStyle["fontWeight"]; fontStyle?: TextStyle["fontStyle"]; }
export function useTypography<TStyle extends TextStyle>(style: TStyle): Typography
{
    const fontLoaded = useRobotoFont();
    const [iconLoaded, , glyphName] = useDefaultIconSet();
    if (!fontLoaded || !iconLoaded)
    {
        return {};
    }

    let fontStyleSuffix;
    switch (style.fontStyle)
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
    switch (style.fontWeight)
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
    if (isEnvironment(Environment.Web))
    {
        fontFamily += `, sans-serif, ${glyphName}`;
    }

    return {
        fontFamily,
        fontWeight: "normal",
        fontStyle: "normal"
    };
}
