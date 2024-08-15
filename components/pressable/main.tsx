import {type AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import React, {forwardRef, JSX, MutableRefObject, useImperativeHandle, useMemo, useRef, useState} from "react";
import ReactNative from "react-native";
import {AnimatedPressable} from "./components";
import {PressableContext, PressableProps, type PressableState} from "./models";
import * as Variant from "./variants";

/**
 * @see https://reactnative.dev/docs/pressable
 */
export const Pressable = forwardRef(function Pressable(
    {
        style = Variant.Default,
        children,
        disabled = false,
        onPress
    }: PressableProps,
    ref: MutableRefObject<Pressable>
): JSX.Element | null
{
    const props: AllPropertiesMustPresent<PressableProps> = {
        style, children, disabled, onPress
    };

    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);
    const state: PressableState = {hovered, pressed};

    const internalRef = useRef<Pressable>(null);

    const context = useMemo<PressableContext>(
        () => ({props, state}),
        [...Object.values(props), ...Object.values(state)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle, imperativeHandles} = useComputedStyle(style, props, state);

    useImperativeHandle(ref, () => ({...internalRef.current!, ...imperativeHandles}), []);

    if (disabled && (hovered || pressed))
    {
        setHovered(false);
        setPressed(false);
        return null;
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
