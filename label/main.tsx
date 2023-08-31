import {getFontFamily, inheritTextStyleFrom} from "@miniskylab/antimatter-framework";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX} from "react";
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
        <View
            style={() => ({
                ...computedStyle,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0
            })}
            pointerEvents={pointerEvents}
        >
            <Animated.Text
                selectable={selectable}
                numberOfLines={numberOfLines}
                style={{
                    ...inheritTextStyleFrom(computedStyle),
                    fontFamily: getFontFamily(computedStyle),
                    padding: computedStyle.padding,
                    paddingVertical: computedStyle.paddingVertical,
                    paddingHorizontal: computedStyle.paddingHorizontal,
                    paddingTop: computedStyle.paddingTop,
                    paddingBottom: computedStyle.paddingBottom,
                    paddingLeft: computedStyle.paddingLeft,
                    paddingRight: computedStyle.paddingRight
                }}
            >
                {children}
            </Animated.Text>
        </View>
    );
}
