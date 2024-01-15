import {createIconSetFromIcoMoon} from "@expo/vector-icons";
import {AllPropertiesMustPresent, inheritTextStyleFrom, Style, Ts} from "@miniskylab/antimatter-framework";
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
}: IconProps): JSX.Element | null
{
    const props: AllPropertiesMustPresent<IconProps> = {
        style, name, selectable, pointerEvents
    };

    Ts.Error.throwIfNullOrUndefined(style);
    const computedStyle = Style.useComputedStyle(style, props);

    const [assetLoaded, selection, expoFontName, expoAssetId] = useIcomoon();
    if (!assetLoaded)
    {
        return null;
    }

    const IconSet = createIconSetFromIcoMoon(selection, expoFontName, expoAssetId);
    return (
        <View style={() => computedStyle} pointerEvents={pointerEvents}>
            <IconSet name={name} size={computedStyle.fontSize} style={inheritTextStyleFrom(computedStyle)} selectable={selectable}/>
        </View>
    );
}
