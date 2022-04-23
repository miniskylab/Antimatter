import React from "react";
import {Props} from "./model";
import * as Variant from "./variant";

/**
 * This component doesn't have any visual representation. When present on a page it adds horizontal or vertical gap wherever it is used.
 * To control the `width` of vertical gap or `height` of horizontal gap, you need to provide a `CSS` file to this component via its `props`.
 */
export function Component(props: Props): JSX.Element
{
    const {
        variant = Variant.Default
    } = props;

    return (
        <div className={variant["spacer"]}/>
    );
}
