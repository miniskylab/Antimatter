import {bem} from "@miniskylab/antimatter-model";
import React, {useEffect, useRef} from "react";
import {rgba2hex} from "./helper";
import {Props} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    className
}: Props): JSX.Element
{
    const hexCodeElementRef = useRef<HTMLDivElement>(null);
    const swatchElementRef = useRef<HTMLDivElement>(null);

    useEffect(
        () =>
        {
            hexCodeElementRef.current.innerText = rgba2hex(getComputedStyle(swatchElementRef.current).backgroundColor);
        },
        []
    );

    return (
        <div className={bem(className)}>
            <div ref={swatchElementRef} className={bem(className, "Swatch")}/>
            <div ref={hexCodeElementRef} className={bem(className, "HexCode")}>{String.EMPTY}</div>
        </div>
    );
}
