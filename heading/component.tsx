import {HighlightedParagraph} from "@miniskylab/antimatter-highlighted-paragraph";
import {Label} from "@miniskylab/antimatter-label";
import React from "react";
import {HeadingProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Heading({
    className,
    title,
    subTitle = String.EMPTY
}: HeadingProps): JSX.Element
{
    return (
        <div className={className}>
            <Label className={`${className}__title`} text={title}/>
            {subTitle && (<HighlightedParagraph className={`${className}__sub-title`} content={subTitle}/>)}
        </div>
    );
}
