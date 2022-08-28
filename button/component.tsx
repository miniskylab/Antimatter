import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import {bem} from "@miniskylab/antimatter-model";
import React from "react";
import {ButtonProps, Target} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Button({
    className,
    label,
    target = Target.SameFrame,
    disabled = false,
    href,
    icon,
    onClick,
    onPointerDown
}: ButtonProps): JSX.Element
{
    return (
        <a
            target={target}
            href={disabled ? undefined : href}
            rel={target === Target.NewWindowOrTab ? "noopener" : undefined}
            className={bem(className, null, disabled && "Disabled")}
            onClick={!disabled && onClick ? onClick : undefined}
            onPointerDown={onPointerDown}
        >
            {icon && <Icon className={bem("Button-Icon")} name={icon}/>}
            {label && <Label className={bem("Button-Label")} text={label}/>}
        </a>
    );
}
