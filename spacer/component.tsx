import React from "react";
import {SpacerProps} from "./model";

/**
 * This component doesn't have any visual representation. When present on a page it adds horizontal or vertical gap wherever it is used.
 * Use CSS to control the `width` of vertical gap or `height` of horizontal gap.
 */
export function Spacer({
    className
}: SpacerProps): JSX.Element
{
    return (<div className={className}/>);
}
