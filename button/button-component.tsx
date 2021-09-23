import {Icon} from "@miniskylab/antimatter/icon";
import React from "react";
import {ButtonComponentProps} from "./models/button-component-props";
import {ButtonTarget} from "./models/button-target";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function ButtonComponent(props: ButtonComponentProps): JSX.Element
{
    return (
        <a
            href={props.disabled ? undefined : props.href}
            target={props.target}
            rel={props.target === ButtonTarget.NewWindowOrTab ? "noopener" : undefined}
            className={props.variant[`button${props.disabled ? "--disabled" : String.EMPTY}`]}
            download={props.download}
            onClick={!props.disabled && props.onClick ? props.onClick : undefined}
        >
            {props.icon && <Icon className={props.variant["button__icon"]} iconName={props.icon}/>}
            {props.text && <div className={props.variant["button__text"]}>{props.text}</div>}
        </a>
    );
}
