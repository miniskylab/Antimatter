import React from "react";
import {PanelComponentProps} from "./models/panel-component-props";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function PanelComponent(props: PanelComponentProps): JSX.Element
{
    return (
        <div className={props.variant["panel"]}>
            {props.title && <div className={props.variant["panel__title"]}>{props.title}</div>}
            <div className={props.variant["panel__content"]}>{props.children}</div>
        </div>
    );
}
