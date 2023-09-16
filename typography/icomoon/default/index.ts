import {useFonts} from "expo-font";
import {IcomoonSettings} from "../types";
import glyph from "./glyph.ttf";
import selection from "./selection.json";

export function useDefaultIconSet(): IcomoonSettings
{
    const [fontLoaded] = useFonts({glyph});
    if (!fontLoaded)
    {
        return null;
    }

    return [selection, "glyph", "glyph.ttf"];
}
