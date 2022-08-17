import {Label} from "@miniskylab/antimatter-label";
import React from "react";
import {PanelProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Panel({
    className = "antimatter-panel-default",
    title = String.EMPTY,
    children
}: PanelProps): JSX.Element
{
    return (
        <div className={className}>
            {title && <Label className={`${className}__title`} text={title}/>}
            <div className={`${className}__content`}>{children}</div>
        </div>
    );
}
