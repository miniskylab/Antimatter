import {bem} from "@miniskylab/antimatter-model";
import React, {useEffect, useRef} from "react";
import {TypographyProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Typography({
    className,
    exampleText = "The quick brown fox jumps over the lazy dog"
}: TypographyProps): JSX.Element
{
    const exampleTextElementRef = useRef<HTMLDivElement>(null);
    const fontSizeElementRef = useRef<HTMLDivElement>(null);

    useEffect(
        () =>
        {
            fontSizeElementRef.current.innerText = getComputedStyle(exampleTextElementRef.current).fontSize;
        },
        []
    );

    return (
        <div className={className}>
            <div ref={fontSizeElementRef} className={bem(className, "FontSize")}>{String.EMPTY}</div>
            <div ref={exampleTextElementRef} className={bem(className, "ExampleText")}>{exampleText}</div>
        </div>
    );
}
