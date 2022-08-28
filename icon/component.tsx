import {bem} from "@miniskylab/antimatter-model";
import React from "react";
import {IconProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Icon({
    className,
    name
}: IconProps): JSX.Element
{
    return (<div className={`${bem(className)} ${name}`}/>);
}
