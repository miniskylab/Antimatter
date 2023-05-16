import React from "react";
import {Animated} from "react-native";
import {ViewProps} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function View({
    style = Variant.Default,
    children,
    pointerEvents = "auto",
    onLayout
}: ViewProps): JSX.Element
{
    const props: Required<ViewProps> = {
        style, children, pointerEvents, onLayout
    };

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    return (
        <Animated.View
            style={computedStyle}
            pointerEvents={pointerEvents}
            onLayout={onLayout}
        >
            {children}
        </Animated.View>
    );
}
