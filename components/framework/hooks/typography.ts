import {FontCollection, IcomoonSettings, IconSetCollection} from "@miniskylab/antimatter-typography";
import {FontSource, isLoaded, loadAsync, useFonts} from "expo-font";
import {useEffect, useState} from "react";
import {TextStyle} from "react-native";
import {EMPTY_STRING} from "../consts";
import {isEnvironment} from "../core";
import {ssrIsEnabled} from "./responsive";

export function useDefaultFont(): boolean
{
    const [fontsLoaded] = useCustomFonts(FontCollection.Default);
    return fontsLoaded;
}

export function useDefaultIconSet(): IcomoonSettings
{
    const [fontLoaded] = useCustomFonts(IconSetCollection.Default.FontMap);
    return [fontLoaded, IconSetCollection.Default.IcomoonSelection, "glyph", "glyph.ttf"];
}

type Typography = { fontFamily?: string; fontWeight?: TextStyle["fontWeight"]; fontStyle?: TextStyle["fontStyle"]; }
export function useTypography<TStyle extends TextStyle>(style?: TStyle): Typography | undefined
{
    const fontLoaded = useDefaultFont();
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

function useCustomFonts(fontMap: string | Record<string, FontSource>): ReturnType<typeof useFonts>
{
    const [componentDidMount, setComponentDidMount] = useState(false);
    const [loaded, setLoaded] = useState(ssrIsEnabled() && !componentDidMount ? false : isFontMapLoaded(fontMap));
    const [error, setError] = useState<Error | null>(null);

    useEffect(() =>
    {
        setComponentDidMount(true);
        loadAsync(fontMap)
            .then(() => setLoaded(true))
            .catch(setError);
    }, []);

    return [loaded, error];
}

function isFontMapLoaded(fontMap: string | Record<string, FontSource>)
{
    if (typeof fontMap === "string")
    {
        return isLoaded(fontMap);
    }
    else
    {
        return Object.keys(fontMap).every((fontFamily) => isLoaded(fontFamily));
    }
}
