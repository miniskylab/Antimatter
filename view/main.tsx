import {AllPropertiesMustPresent, Style, Ts} from "@miniskylab/antimatter-framework";
import React, {forwardRef, JSX, MutableRefObject} from "react";
import ReactNative, {Animated} from "react-native";
import {ViewProps} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export const View = forwardRef(function View(
    {
        style = Variant.Default,
        children,
        pointerEvents = "auto",
        onLayout,
        onStartShouldSetResponder,
        onMoveShouldSetResponder,
        onResponderStart,
        onResponderMove
    }: ViewProps,
    ref: MutableRefObject<View>
): JSX.Element
{
    const props: AllPropertiesMustPresent<ViewProps> = {
        style, children, pointerEvents, onLayout, onStartShouldSetResponder, onMoveShouldSetResponder, onResponderStart, onResponderMove
    };

    Ts.Error.throwIfNullOrUndefined(style);
    const computedStyle = Style.useComputedStyle(style, props);

    return (
        <Animated.View
            ref={ref}
            style={computedStyle}
            pointerEvents={pointerEvents}
            onLayout={onLayout}
            onStartShouldSetResponder={onStartShouldSetResponder}
            onMoveShouldSetResponder={onMoveShouldSetResponder}
            onResponderStart={onResponderStart}
            onResponderMove={onResponderMove}
        >
            {children}
        </Animated.View>
    );
});

export type View = ReactNative.View;
