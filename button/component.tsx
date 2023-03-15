import {AnimatedPressable} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import React, {useMemo, useState} from "react";
import {ButtonContext, ButtonProps} from "./model";
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
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);
    if (disabled)
    {
        if (hovered) setHovered(false);
        if (pressed) setPressed(false);
    }

    if (!children && !style)
    {
        style = label ? Variant.OutlinedRectangular : Variant.OutlinedCircular;
    }

    const state = useMemo(() => ({hovered, pressed}), [hovered, pressed]);
    const Style = style({children, label, icon, disabled, onClick}, state);

    return (
        <AnimatedPressable
            style={Style.Root}
            onHoverIn={() => { setHovered(!disabled); }}
            onHoverOut={() => { setHovered(false); }}
            onPressIn={() => { setPressed(!disabled); }}
            onPressOut={() => { setPressed(false); }}
            onPress={!disabled && onClick ? onClick : undefined}
        >
            {
                children
                    ? (
                        <ButtonContext.Provider value={state}>
                            {children}
                        </ButtonContext.Provider>
                    )
                    : (
                        <>
                            {icon && <Icon style={Style.Icon} name={icon} pointerEvents={"none"}/>}
                            {label && <Label style={Style.Label} pointerEvents={"none"} selectable={false}>{label}</Label>}
                        </>
                    )
            }
        </AnimatedPressable>
    );
}
