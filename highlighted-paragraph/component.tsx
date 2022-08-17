import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import React from "react";
import {HighlightedParagraphProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function HighlightedParagraph({
    className = "antimatter-highlighted-paragraph-default",
    icon,
    title,
    content
}: HighlightedParagraphProps): JSX.Element
{
    return (
        <div className={className}>
            {(icon || title) && (
                <div className={`${className}__title-container`}>
                    {icon && <Icon className={`${className}__title-icon`} name={icon}/>}
                    {title && <Label className={`${className}__title-text`} text={title}/>}
                </div>
            )}
            {(icon || title) && content && <div className={`${className}__gap`}/>}
            {content && <Label className={`${className}__content`} text={content}/>}
        </div>
    );
}
