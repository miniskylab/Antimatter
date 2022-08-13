import {Html} from "@miniskylab/antimatter-html";
import React from "react";
import {LabelProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Label({
    className = "label",
    text
}: LabelProps): JSX.Element
{
    return (
        <div className={className}>{Html.render(text)}</div>
    );
}
