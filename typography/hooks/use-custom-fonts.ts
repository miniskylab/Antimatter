import {ssrIsEnabled} from "@miniskylab/antimatter-framework";
import {FontSource, isLoaded, loadAsync, useFonts} from "expo-font";
import {useEffect, useState} from "react";

export function useCustomFonts(fontMap: string | Record<string, FontSource>): ReturnType<typeof useFonts>
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
