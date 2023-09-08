import React, {forwardRef, JSX, MutableRefObject, useMemo, useState} from "react";
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
    const props: Required<PressableProps> = {
        style, children, disabled, onPress
    };

    const [state, setState] = useState<PressableState>({
        hovered: false,
        pressed: false
    });

    const context = useMemo<PressableContext>(
        () => ({props, state}),
        [...Object.values(props), ...Object.values(state)]
    );

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle, state);

    if (disabled && (state.hovered || state.pressed))
    {
        setState(prevState => ({
            ...prevState,
            hovered: false,
            pressed: false
        }));
    }

    return (
        <PressableContext.Provider value={context}>
            <AnimatedPressable
                ref={ref}
                style={computedStyle}
                onHoverIn={() => { setState(prevState => ({...prevState, hovered: !disabled})); }}
                onHoverOut={() => { setState(prevState => ({...prevState, hovered: false})); }}
                onPressIn={() => { setState(prevState => ({...prevState, pressed: !disabled})); }}
                onPressOut={() => { setState(prevState => ({...prevState, pressed: false})); }}
                onPress={!disabled && onPress ? onPress : undefined}
            >
                {children}
            </AnimatedPressable>
        </PressableContext.Provider>
    );
});

export type Pressable = ReactNative.View;
