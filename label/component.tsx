import {Html} from "@miniskylab/antimatter-html";
import React from "react";
import {Props} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    variant = Variant.Default,
    text
}: Props): JSX.Element
{
    return (
        <div className={variant["label"]}>{Html.render(text)}</div>
    );
}
