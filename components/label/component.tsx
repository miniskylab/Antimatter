import {Html} from "@miniskylab/antimatter-html";
import React from "react";
import {Props} from "./models/props";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Label(props: Props): JSX.Element
{
    const {
        variant = Variant.Default,
        text
    } = props;

    return (
        <div className={variant["label"]}>{Html.render(text)}</div>
    );
}
