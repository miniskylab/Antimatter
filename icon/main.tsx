import {createIconSetFromIcoMoon} from "@expo/vector-icons";
import {inheritTextStyleFrom} from "@miniskylab/antimatter-framework";
import {useIcomoon} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX} from "react";
import {IconProps} from "./models";
import * as Variant from "./variants";

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

    const icomoonSettings = useIcomoon();
    if (!icomoonSettings)
    {
        return null;
    }

    const [selection, expoFontName, expoAssetId] = icomoonSettings;
    const IconSet = createIconSetFromIcoMoon(selection, expoFontName, expoAssetId);

    return (
        <View style={() => computedStyle} pointerEvents={pointerEvents}>
            <IconSet name={name} size={computedStyle.fontSize} style={inheritTextStyleFrom(computedStyle)} selectable={selectable}/>
        </View>
    );
}
