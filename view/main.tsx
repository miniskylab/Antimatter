import React, {forwardRef, JSX, MutableRefObject} from "react";
import ReactNative, {Animated} from "react-native";
import {ViewProps} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export const View = forwardRef(function View(
    {
        style = Variant.Default,
        children,
        pointerEvents = "auto",
        onLayout
    }: ViewProps,
    ref: MutableRefObject<View>
): JSX.Element
{
    const props: Required<ViewProps> = {
        style, children, pointerEvents, onLayout
    };

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    return (
        <Animated.View
            ref={ref}
            style={computedStyle}
            pointerEvents={pointerEvents}
            onLayout={onLayout}
        >
            {children}
        </Animated.View>
    );
});

export type View = ReactNative.View;
