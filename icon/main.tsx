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
    id,
    style = Variant.Default,
    onReadyToUnmount,
    pointerEvents = "auto",
    name
}: IconProps): JSX.Element
{
    const props: Required<IconProps> = {
        id, style, onReadyToUnmount, pointerEvents, name
    };

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

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
        <Animated.View style={computedStyle.Root} pointerEvents={pointerEvents}>
            <IconSet name={name} size={computedStyle.Root.fontSize} style={inheritTextStyleFrom(computedStyle.Root)}/>
        </Animated.View>
    );
}
