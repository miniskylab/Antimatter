import {Html} from "@miniskylab/antimatter-html";
import {Icon} from "@miniskylab/antimatter-icon";
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
        icon,
        title = String.EMPTY,
        text = String.EMPTY
    } = props;

    return (
        <div className={variant["highlighted-paragraph"]}>
            {(icon || title) && (
                <div className={variant["highlighted-paragraph__title"]}>
                    {icon && <Icon className={variant["highlighted-paragraph__icon"]} iconName={icon}/>}
                    {title && title}
                </div>
            )}
            {(title || icon) && text && <div className={variant["highlighted-paragraph__gap"]}/>}
            {text && <div className={variant["highlighted-paragraph__text"]}>{Html.render(text)}</div>}
        </div>
    );
}
