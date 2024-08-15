import {type AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import React, {forwardRef, JSX, MutableRefObject, useImperativeHandle, useRef} from "react";
import ReactNative, {Animated} from "react-native";
import {ViewProps} from "./models";
import * as Variant from "./variants";

/**
 * @see https://reactnative.dev/docs/view
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

    const internalRef = useRef<View>(null);

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle, imperativeHandles} = useComputedStyle(style, props);

    useImperativeHandle(ref, () => ({...internalRef.current!, ...imperativeHandles}), []);

    return (
        <Animated.View
            ref={internalRef}
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

export type View<TExtra extends object = object> = Omit<ReactNative.View, keyof TExtra> & TExtra;
