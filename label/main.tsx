import {getFontFamily, inheritTextStyleFrom} from "@miniskylab/antimatter-framework";
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
    pointerEvents = "auto"
}: LabelProps): JSX.Element
{
    const props: Required<LabelProps> = {
        style, children, selectable, pointerEvents
    };

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    return (
        <Animated.View style={computedStyle.Root} pointerEvents={pointerEvents}>
            <Animated.Text
                selectable={selectable}
                style={{
                    ...inheritTextStyleFrom(computedStyle.Root),
                    fontFamily: getFontFamily(computedStyle.Root)
                }}
            >
                {children}
            </Animated.Text>
        </Animated.View>
    );
}
