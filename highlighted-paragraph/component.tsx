import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import {bem} from "@miniskylab/antimatter-model";
import React from "react";
import {HighlightedParagraphProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function HighlightedParagraph({
    className,
    icon,
    title,
    content
}: HighlightedParagraphProps): JSX.Element
{
    return (
        <div className={bem(className)}>
            {(icon || title) && (
                <div className={bem(className, "TitleContainer")}>
                    {icon && <Icon className={bem("HighlightedParagraph-TitleIcon")} name={icon}/>}
                    {title && <Label className={bem("HighlightedParagraph-TitleText")} text={title}/>}
                </div>
            )}
            {(icon || title) && content && <div className={bem(className, "Gap")}/>}
            {content && <Label className={bem("HighlightedParagraph-Content")} text={content}/>}
        </div>
    );
}
