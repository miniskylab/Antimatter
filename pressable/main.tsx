import {AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import React, {forwardRef, JSX, MutableRefObject, useImperativeHandle, useMemo, useRef, useState} from "react";
import ReactNative from "react-native";
import {AnimatedPressable} from "./components";
import {PressableContext, PressableProps, PressableState} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export const Pressable = forwardRef(function Pressable(
    {
        style = Variant.Default,
        children,
        disabled = false,
        onPress
    }: PressableProps,
    ref: MutableRefObject<Pressable>
): JSX.Element
{
    const props: AllPropertiesMustPresent<PressableProps> = {
        style, children, disabled, onPress
    };

    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);
    const state: PressableState = {hovered, pressed};

    const context = useMemo<PressableContext>(
        () => ({props, state}),
        [...Object.values(props), ...Object.values(state)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle, imperativeHandles} = useComputedStyle(style, props, state);

    const internalRef = useRef<Pressable>(null);
    useImperativeHandle(ref, () => ({...internalRef.current!, ...imperativeHandles}), []);

    if (disabled && (hovered || pressed))
    {
        setHovered(false);
        setPressed(false);
    }

    return (
        <PressableContext.Provider value={context}>
            <AnimatedPressable
                ref={internalRef}
                style={computedStyle}
                onHoverIn={() => { setHovered(!disabled); }}
                onHoverOut={() => { setHovered(false); }}
                onPressIn={() => { setPressed(!disabled); }}
                onPressOut={() => { setPressed(false); }}
                onPress={!disabled && onPress ? onPress : undefined}
            >
                {children}
            </AnimatedPressable>
        </PressableContext.Provider>
    );
});

export type Pressable<TExtra extends object = object> = Omit<ReactNative.View, keyof TExtra> & TExtra;
