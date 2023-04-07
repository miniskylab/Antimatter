import {AnimatedPressable} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import React, {useMemo, useState} from "react";
import {ButtonContext, ButtonProps, ButtonState} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Button({
    style,
    children,
    label,
    icon,
    disabled = false,
    onClick
}: ButtonProps): JSX.Element
{
    const props: Required<ButtonProps> = {
        style, children, label, icon, disabled, onClick
    };

    const [state, setState] = useState<ButtonState>({
        hovered: false,
        pressed: false
    });

    const context = useMemo<ButtonContext>(
        () => ({props, state}),
        [...Object.values(props), ...Object.values(state)]
    );

    if (!children && !style)
    {
        style = label ? Variant.OutlinedRectangular : Variant.OutlinedCircular;
    }

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
        <ButtonContext.Provider value={context}>
            <AnimatedPressable
                style={computedStyle.Root}
                onHoverIn={() => { setState(prevState => ({...prevState, hovered: !disabled})); }}
                onHoverOut={() => { setState(prevState => ({...prevState, hovered: false})); }}
                onPressIn={() => { setState(prevState => ({...prevState, pressed: !disabled})); }}
                onPressOut={() => { setState(prevState => ({...prevState, pressed: false})); }}
                onPress={!disabled && onClick ? onClick : undefined}
            >
                {
                    children
                        ? children
                        : (
                            <>
                                {icon && <Icon style={computedStyle.Icon} name={icon} pointerEvents={"none"}/>}
                                {label && <Label style={computedStyle.Label} pointerEvents={"none"} selectable={false}>{label}</Label>}
                            </>
                        )
                }
            </AnimatedPressable>
        </ButtonContext.Provider>
    );
}
