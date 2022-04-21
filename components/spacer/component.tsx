import React from "react";
import {Props} from "./models/props";
import * as Variant from "./variants";

/**
 * This component doesn't have any visual representation. When present on a page it adds horizontal or vertical gap wherever it is used.
 * To control the `width` of vertical gap or `height` of horizontal gap, you need to provide a `CSS` file to this component via its `props`.
 */
export function Spacer(props: Props): JSX.Element
{
    const {
        variant = Variant.Default
    } = props;

    return (
        <div className={variant["spacer"]}/>
    );
}
