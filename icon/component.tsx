import React from "react";
import {IconProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Icon({
    className = "icon",
    name,
    onClick,
    onPointerDown
}: IconProps): JSX.Element
{
    return (
        <div
            className={`${className} ${name}`}
            onClick={onClick ? onClick : undefined}
            onPointerDown={onPointerDown ? onPointerDown : undefined}
        />
    );
}
