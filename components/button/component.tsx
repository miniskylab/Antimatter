import {Icon} from "@miniskylab/antimatter-icon";
import React from "react";
import {Props} from "./models/props";
import {Target} from "./models/target";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Button(props: Props): JSX.Element
{
    const {
        variant = props.text ? Variant.OutlinedRectangle : Variant.OutlinedCircular,
        href,
        text = String.EMPTY,
        icon,
        target = Target.SameFrame,
        download,
        disabled = false,
        onClick
    } = props;

    return (
        <a
            href={disabled ? undefined : href}
            target={target}
            rel={target === Target.NewWindowOrTab ? "noopener" : undefined}
            className={variant[`button${disabled ? "--disabled" : String.EMPTY}`]}
            download={download}
            onClick={!disabled && onClick ? onClick : undefined}
        >
            {icon && <Icon className={variant["button__icon"]} iconName={icon}/>}
            {text && <div className={variant["button__text"]}>{text}</div>}
        </a>
    );
}
