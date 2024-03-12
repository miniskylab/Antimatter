import {AllPropertiesMustPresent, EMPTY_STRING, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Pressable} from "@miniskylab/antimatter-pressable";
import {Text} from "@miniskylab/antimatter-text";
import React, {JSX, useMemo} from "react";
import {ButtonContext, ButtonProps} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Button({
    style,
    label = EMPTY_STRING,
    icon,
    disabled = false,
    onPress
}: ButtonProps): JSX.Element
{
    const props: AllPropertiesMustPresent<ButtonProps> = {
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

    const {computedStyle} = useComputedStyle(style, props);

    return (
        <ButtonContext.Provider value={context}>
            <Pressable style={computedStyle.Root} disabled={disabled} onPress={onPress}>
                {!!icon && <Icon style={computedStyle.Icon} name={icon} pointerEvents={"none"} selectable={false}/>}
                {!!label && (
                    <Text
                        style={computedStyle.Label}
                        pointerEvents={"none"}
                        selectable={false}
                        numberOfLines={1}
                    >
                        {label}
                    </Text>
                )}
            </Pressable>
        </ButtonContext.Provider>
    );
}
