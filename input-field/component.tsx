import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import {bem} from "@miniskylab/antimatter-model";
import React from "react";
import {InputFieldProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function InputField({
    className,
    value = String.EMPTY,
    icon,
    placeholder,
    autoFocus = false,
    isPasswordField = false,
    onChange,
    onBlur,
    onFocus,
    onPointerDown,
    onKeyDown
}: InputFieldProps): JSX.Element
{
    const shrunkModifier = placeholder && value ? "Shrunk" : String.EMPTY;

    return (
        <div className={bem(className)}>
            {icon && <Icon className={bem("InputField-Addon")} name={icon}/>}
            <div className={bem(className, "Container")}>
                {placeholder && <Label className={bem("InputField-Placeholder", null, shrunkModifier)} text={placeholder}/>}
                <input
                    type={isPasswordField ? "password" : "text"}
                    className={bem(className, "TextBox", shrunkModifier)}
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
