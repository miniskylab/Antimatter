import React from "react";
import {SpacerComponentProps} from "./models/spacer-component-props";

/**
 * This component doesn't have any visual representation. When present on a page it adds horizontal or vertical gap wherever it is used.
 * To control the `width` of vertical gap or `height` of horizontal gap, you need to provide a `CSS` file to this component via its `props`.
 */
export function SpacerComponent(props: SpacerComponentProps): JSX.Element
{
    return (
        <div className={props.variant["spacer"]}/>
    );
}
