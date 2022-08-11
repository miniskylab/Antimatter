import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import React from "react";
import {Props, Target} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    variant,
    label,
    target = Target.SameFrame,
    disabled = false,
    href,
    icon,
    onClick
}: Props): JSX.Element
{
    variant = variant ?? (label?.text ? Variant.OutlinedRectangular : Variant.OutlinedCircular);

    return (
        <a
            href={disabled ? undefined : href}
            target={target}
            rel={target === Target.NewWindowOrTab ? "noopener" : undefined}
            className={variant[`button${disabled ? "--disabled" : String.EMPTY}`]}
            onClick={!disabled && onClick ? onClick : undefined}
        >
            {icon && <Icon {...icon} variant={icon?.variant ?? variant}/>}
            {label?.text && <Label {...label} variant={label?.variant ?? variant}/>}
        </a>
    );
}
