import {Label} from "@miniskylab/antimatter-label";
import {bem} from "@miniskylab/antimatter-model";
import React from "react";
import {PanelProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Panel({
    className,
    title,
    children
}: PanelProps): JSX.Element
{
    return (
        <div className={bem(className)}>
            {title && <Label className={bem("Panel-Title")} text={title}/>}
            <div className={bem(className, "Content")}>{children}</div>
        </div>
    );
}
