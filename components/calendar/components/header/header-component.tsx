import {Icon, IconName} from "@miniskylab/antimatter-icon";
import React from "react";
import {HeaderComponentProps} from "./models/header-component-props";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function HeaderComponent(props: HeaderComponentProps): JSX.Element
{
    return (
        <div className={props.variant["header"]}>
            <Icon
                className={props.variant[`header__navigator${props.onPrevClick ? String.EMPTY : "--disabled"}`]}
                iconName={IconName.ChevronLeft}
                onClick={props.onPrevClick}
            />
            <div
                onClick={props.onHeadlineClick}
                className={props.variant[`header__headline${props.onHeadlineClick ? String.EMPTY : "--unclickable"}`]}
            >
                {props.headline}
            </div>
            <Icon
                className={props.variant[`header__navigator${props.onNextClick ? String.EMPTY : "--disabled"}`]}
                iconName={IconName.ChevronRight}
                onClick={props.onNextClick}
            />
        </div>
    );
}
