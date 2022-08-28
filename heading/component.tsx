import {HighlightedParagraph} from "@miniskylab/antimatter-highlighted-paragraph";
import {Label} from "@miniskylab/antimatter-label";
import {bem} from "@miniskylab/antimatter-model";
import React from "react";
import {HeadingProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Heading({
    className,
    title,
    subTitle
}: HeadingProps): JSX.Element
{
    return (
        <div className={bem(className)}>
            <Label className={bem("Heading-Title")} text={title}/>
            {subTitle && (<HighlightedParagraph className={bem("Heading-SubTitle")} content={subTitle}/>)}
        </div>
    );
}
