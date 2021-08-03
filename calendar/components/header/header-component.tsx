import {Icon, IconName} from "antimatter/icon";
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
                className={props.variant[`header__navigator${props.onPrevClicked ? String.EMPTY : "--disabled"}`]}
                iconName={IconName.ChevronLeft}
                onClick={props.onPrevClicked}
            />
            <div
                onClick={props.onHeadlineClicked}
                className={props.variant[`header__headline${props.onHeadlineClicked ? String.EMPTY : "--unclickable"}`]}
            >
                {props.headline}
            </div>
            <Icon
                className={props.variant[`header__navigator${props.onNextClicked ? String.EMPTY : "--disabled"}`]}
                iconName={IconName.ChevronRight}
                onClick={props.onNextClicked}
            />
        </div>
    );
}
