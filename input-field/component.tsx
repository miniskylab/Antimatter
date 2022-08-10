import {Icon} from "@miniskylab/antimatter-icon-legacy";
import React from "react";
import {Props} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    variant = Variant.Default,
    icon,
    value = String.EMPTY,
    placeholderText = String.EMPTY,
    autoFocus = false,
    isPasswordField = false,
    onChange,
    onBlur,
    onFocus,
    onPointerDown,
    onKeyDown
}: Props): JSX.Element
{
    const hasValue = !!value;
    const shrunkModifier = placeholderText && hasValue ? "--shrunk" : String.EMPTY;

    return (
        <div className={variant["input-field"]}>
            {icon && <Icon className={variant["input-field__addon"]} iconName={icon}/>}
            <div className={variant["input-field__container"]}>
                {placeholderText && <div className={variant[`input-field__placeholder${shrunkModifier}`]}>{placeholderText}</div>}
                <input
                    type={isPasswordField ? "password" : "text"}
                    className={variant[`input-field__text-box${shrunkModifier}`]}
                    value={value}
                    onChange={handleChangeEvent}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onPointerDown={onPointerDown}
                    onKeyDown={onKeyDown}
                    autoFocus={autoFocus}
                />
            </div>
        </div>
    );

    function handleChangeEvent(changeEvent: React.ChangeEvent<HTMLInputElement>)
    {
        const newValue = changeEvent.target.value;
        onChange?.(newValue);
    }
}
