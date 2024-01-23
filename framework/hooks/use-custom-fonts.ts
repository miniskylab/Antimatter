import {FontSource, loadAsync, useFonts} from "expo-font";
import {useEffect, useState} from "react";

export function useCustomFonts(fontMap: string | Record<string, FontSource>): ReturnType<typeof useFonts>
{
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() =>
    {
        loadAsync(fontMap)
            .then(() => setLoaded(true))
            .catch(setError);
    }, []);

    return [loaded, error];
}
