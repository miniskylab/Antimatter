import {createIconSetFromIcoMoon} from "@expo/vector-icons";
import {inheritTextStyleFrom} from "@miniskylab/antimatter-model";
import {useFonts} from "expo-font";
import React from "react";
import {View} from "react-native";
import icomoonFont from "./asset/antimatter.ttf";
import icomoonSelection from "./asset/selection.json";
import {IconProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Icon({
    style,
    name
}: IconProps): JSX.Element
{
    const [fontsLoaded] = useFonts({
        Antimatter: icomoonFont
    });

    if (!fontsLoaded)
    {
        return null;
    }

    const IconSet = createIconSetFromIcoMoon(
        icomoonSelection,
        "Antimatter",
        "antimatter.ttf"
    );

    return (
        <View style={style.Root}>
            <IconSet name={name} size={style.Root.fontSize} style={inheritTextStyleFrom(style.Root)}/>
        </View>
    );
}
