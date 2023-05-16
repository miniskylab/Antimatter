import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import {Pressable} from "@miniskylab/antimatter-pressable";
import React, {useMemo} from "react";
import {ButtonContext, ButtonProps} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Button({
    style,
    label,
    icon,
    disabled = false,
    onPress
}: ButtonProps): JSX.Element
{
    const props: Required<ButtonProps> = {
        style, label, icon, disabled, onPress
    };

    const context = useMemo<ButtonContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    if (!style)
    {
        style = label ? Variant.OutlinedRectangular : Variant.OutlinedCircular;
    }

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    return (
        <ButtonContext.Provider value={context}>
            <Pressable style={computedStyle.Root} disabled={disabled} onPress={onPress}>
                {icon && <Icon style={computedStyle.Icon} name={icon} pointerEvents={"none"}/>}
                {label && (
                    <Label
                        style={computedStyle.Label}
                        pointerEvents={"none"}
                        selectable={false}
                        numberOfLines={1}
                    >
                        {label}
                    </Label>
                )}
            </Pressable>
        </ButtonContext.Provider>
    );
}
