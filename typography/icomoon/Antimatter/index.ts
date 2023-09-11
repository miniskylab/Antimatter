import {createIconSetFromIcoMoon} from "@expo/vector-icons";
import {useFonts} from "expo-font";
import icomoonAntimatter from "./antimatter.ttf";
import icomoonSelection from "./selection.json";

export function useIcomoonAntimatterIconSet(): ReturnType<typeof createIconSetFromIcoMoon>
{
    const [fontsLoaded] = useFonts({
        Antimatter: icomoonAntimatter
    });

    if (!fontsLoaded)
    {
        return null;
    }

    return createIconSetFromIcoMoon(
        icomoonSelection,
        "Antimatter",
        "antimatter.ttf"
    );
}
