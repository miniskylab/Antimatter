import {getFontFamily, inheritTextStyleFrom} from "@miniskylab/antimatter-model";
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
    const Style = style({children, selectable, pointerEvents});

    return (
        <Animated.View style={Style.Root} pointerEvents={pointerEvents}>
            <Animated.Text
                selectable={selectable}
                style={{
                    ...inheritTextStyleFrom(Style.Root),
                    fontFamily: getFontFamily(Style.Root)
                }}
            >
                {children}
            </Animated.Text>
        </Animated.View>
    );
}
