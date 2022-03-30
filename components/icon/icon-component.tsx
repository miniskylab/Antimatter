import React from "react";
import {IconComponentProps} from "./models/icon-component-props";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function IconComponent(props: IconComponentProps): JSX.Element
{
    return (
        <div
            className={`${props.className} ${props.variant[props.iconName]}`}
            onClick={props.onClick ? props.onClick : undefined}
            style={props.style}
            onPointerDown={props.onPointerDown ? props.onPointerDown : undefined}
        />
    );
}
