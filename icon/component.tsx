import React from "react";
import {Props} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    variant = Variant.Default,
    name,
    onClick,
    onPointerDown
}: Props): JSX.Element
{
    return (
        <div
            className={`${variant["icon"]} ${name}`}
            onClick={onClick ? onClick : undefined}
            onPointerDown={onPointerDown ? onPointerDown : undefined}
        />
    );
}
