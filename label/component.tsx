import {Html} from "@miniskylab/antimatter-html";
import {bem} from "@miniskylab/antimatter-model";
import React from "react";
import {LabelProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Label({
    className,
    text
}: LabelProps): JSX.Element
{
    return (
        <div className={bem(className)}>{Html.render(text)}</div>
    );
}
