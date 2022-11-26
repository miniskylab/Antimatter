import {createIconSetFromIcoMoon} from "@expo/vector-icons";
import {inheritTextStyleFrom} from "@miniskylab/antimatter-model";
import {useFonts} from "expo-font";
import React from "react";
import {Animated} from "react-native";
import icomoonFont from "./asset/antimatter.ttf";
import icomoonSelection from "./asset/selection.json";
import {IconProps} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Icon({
    style = Variant.Default,
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

    const Style = style({name});
    const IconSet = createIconSetFromIcoMoon(
        icomoonSelection,
        "Antimatter",
        "antimatter.ttf"
    );

    return (
        <Animated.View style={Style.Root}>
            <IconSet name={name} size={Style.Root.fontSize} style={inheritTextStyleFrom(Style.Root)}/>
        </Animated.View>
    );
}
