import {Icon, IconName} from "@miniskylab/antimatter-icon";
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
        headline = String.EMPTY,
        onPrevClick,
        onNextClick,
        onHeadlineClick
    } = props;

    return (
        <div className={variant["header"]}>
            <Icon
                className={variant[`header__navigator${onPrevClick ? String.EMPTY : "--disabled"}`]}
                iconName={IconName.ChevronLeft}
                onClick={onPrevClick}
            />
            <div
                onClick={onHeadlineClick}
                className={variant[`header__headline${onHeadlineClick ? String.EMPTY : "--unclickable"}`]}
            >
                {headline}
            </div>
            <Icon
                className={variant[`header__navigator${onNextClick ? String.EMPTY : "--disabled"}`]}
                iconName={IconName.ChevronRight}
                onClick={onNextClick}
            />
        </div>
    );
}
