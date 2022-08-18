import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
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
    const shrunkModifier = placeholder && value ? "--shrunk" : String.EMPTY;

    return (
        <div className={className}>
            {icon && <Icon className={`${className}__addon`} name={icon}/>}
            <div className={`${className}__container`}>
                {placeholder && <Label className={`${className}__placeholder${shrunkModifier}`} text={placeholder}/>}
                <input
                    type={isPasswordField ? "password" : "text"}
                    className={`${className}__text-box${shrunkModifier}`}
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
