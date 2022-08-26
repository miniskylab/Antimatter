import {Label} from "@miniskylab/antimatter-label";
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
        <div className={className}>
            {title && <Label className={"Panel-Title"} text={title}/>}
            <div className={`${className}__Content`}>{children}</div>
        </div>
    );
}
