import {EMPTY_STRING, Environment, useEnvironment} from "@miniskylab/antimatter-framework";
import {TextStyle} from "react-native";
import {useRobotoFont} from "./font";
import {useIcomoonAntimatterIconSet} from "./icomoon";

export function useTypography(): [fontsLoaded: boolean, IconSet: ReturnType<typeof useIcomoonAntimatterIconSet>]
{
    const fontsLoaded = useRobotoFont();
    const IconSet = useIcomoonAntimatterIconSet();

    if (!fontsLoaded || !IconSet)
    {
        return [false, null];
    }

    return [fontsLoaded, IconSet];
}

export function getFontFamily<TStyle extends TextStyle>(style: TStyle): string
{
    const fontName = "Roboto";
    const runningOnWeb = useEnvironment(Environment.Web);
    if (runningOnWeb)
    {
        return `${fontName}, sans-serif, antimatter`;
    }

    let fontStyle;
    switch (style.fontStyle)
    {
        case "italic":
            fontStyle = "-Italic";
            break;

        case "normal":
        default:
            fontStyle = EMPTY_STRING;
            break;
    }

    let fontWeight;
    switch (style.fontWeight)
    {
        case "100":
        case "200":
            fontWeight = "-Thin";
            break;

        case "300":
            fontWeight = "-Light";
            break;

        case "400":
            fontWeight = "-Regular";
            break;

        case "500":
        case "600":
            fontWeight = "-Medium";
            break;

        case "bold":
        case "700":
        case "800":
            fontWeight = "-Bold";
            break;

        case "900":
            fontWeight = "-Black";
            break;

        case "normal":
        default:
            fontWeight = "-Regular";
            break;
    }

    return `${fontName}${fontWeight}${fontStyle}`;
}
