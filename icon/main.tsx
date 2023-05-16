import {createIconSetFromIcoMoon} from "@expo/vector-icons";
import {inheritTextStyleFrom} from "@miniskylab/antimatter-framework";
import {View} from "@miniskylab/antimatter-view";
import {useFonts} from "expo-font";
import React from "react";
import icomoonFont from "./asset/antimatter.ttf";
import icomoonSelection from "./asset/selection.json";
import {IconProps} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Icon({
    style = Variant.Default,
    name,
    selectable = true,
    pointerEvents = "auto"
}: IconProps): JSX.Element
{
    const props: Required<IconProps> = {
        style, name, selectable, pointerEvents
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
        <View style={() => computedStyle} pointerEvents={pointerEvents}>
            <IconSet name={name} size={computedStyle.fontSize} style={inheritTextStyleFrom(computedStyle)} selectable={selectable}/>
        </View>
    );
}
