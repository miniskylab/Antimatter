import {Icon} from "@miniskylab/antimatter-icon-legacy";
import React from "react";
import {Props, Target} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    variant,
    text = String.EMPTY,
    target = Target.SameFrame,
    disabled = false,
    href,
    icon,
    onClick
}: Props): JSX.Element
{
    variant = variant ?? (text ? Variant.OutlinedRectangle : Variant.OutlinedCircular);

    return (
        <a
            href={disabled ? undefined : href}
            target={target}
            rel={target === Target.NewWindowOrTab ? "noopener" : undefined}
            className={variant[`button${disabled ? "--disabled" : String.EMPTY}`]}
            onClick={!disabled && onClick ? onClick : undefined}
        >
            {icon && <Icon className={variant["button__icon"]} iconName={icon}/>}
            {text && <div className={variant["button__text"]}>{text}</div>}
        </a>
    );
}
