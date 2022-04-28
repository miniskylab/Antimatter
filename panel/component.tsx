import React from "react";
import {Props} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component(props: Props): JSX.Element
{
    const {
        variant = Variant.Default,
        title = String.EMPTY,
        children
    } = props;

    return (
        <div className={variant["panel"]}>
            {title && <div className={variant["panel__title"]}>{title}</div>}
            <div className={variant["panel__content"]}>{children}</div>
        </div>
    );
}
