import {FontSource, isLoaded, loadAsync, useFonts} from "expo-font";
import {useEffect, useState} from "react";

export function useCustomFonts(fontMap: string | Record<string, FontSource>): ReturnType<typeof useFonts>
{
    const [loaded, setLoaded] = useState(isFontMapLoaded(fontMap));
    const [error, setError] = useState<Error | null>(null);

    useEffect(() =>
    {
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
