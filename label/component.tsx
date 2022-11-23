import {getFontFamily, inheritTextStyleFrom} from "@miniskylab/antimatter-model";
import React from "react";
import {Text, View} from "react-native";
import {LabelProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Label({
    style,
    children,
    selectable = true,
    pointerEvents = "auto"
}: LabelProps): JSX.Element
{
    return (
        <View style={style.Root} pointerEvents={pointerEvents}>
            <Text
                selectable={selectable}
                style={{
                    ...inheritTextStyleFrom(style.Root),
                    fontFamily: getFontFamily(style.Root)
                }}
            >
                {children}
            </Text>
        </View>
    );
}
