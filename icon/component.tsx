import {createIconSetFromIcoMoon} from "@expo/vector-icons";
import {inheritTextStyleFrom} from "@miniskylab/antimatter-framework";
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
    pointerEvents = "auto",
    name
}: IconProps): JSX.Element
{
    const {style: _, ...propsWithoutStyle} = arguments[0] as IconProps;
    const Style = style(propsWithoutStyle);

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
        <Animated.View style={Style.Root} pointerEvents={pointerEvents}>
            <IconSet name={name} size={Style.Root.fontSize} style={inheritTextStyleFrom(Style.Root)}/>
        </Animated.View>
    );
}
