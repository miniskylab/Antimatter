import {getFontFamily, inheritTextStyleFrom} from "@miniskylab/antimatter-framework";
import {View} from "@miniskylab/antimatter-view";
import React from "react";
import {Animated} from "react-native";
import {LabelProps} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Label({
    style = Variant.Default,
    children,
    selectable = true,
    numberOfLines = 0,
    pointerEvents = "auto"
}: LabelProps): JSX.Element
{
    const props: Required<LabelProps> = {
        style, children, selectable, numberOfLines, pointerEvents
    };

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    return (
        <View style={() => (computedStyle)} pointerEvents={pointerEvents}>
            <Animated.Text
                selectable={selectable}
                numberOfLines={numberOfLines}
                style={{
                    ...inheritTextStyleFrom(computedStyle),
                    fontFamily: getFontFamily(computedStyle)
                }}
            >
                {children}
            </Animated.Text>
        </View>
    );
}
