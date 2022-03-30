import React from "react";
import {LabelComponentProps} from "./models/label-component-props";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function LabelComponent(props: LabelComponentProps): JSX.Element
{
    return (
        <div className={props.variant["label"]}>{props.text}</div>
    );
}
