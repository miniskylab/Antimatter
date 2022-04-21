import {Icon, IconName} from "@miniskylab/antimatter-icon";
import React, {MouseEventHandler} from "react";
import {Props} from "./models/props";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component(props: Props): JSX.Element
{
    const {
        variant = Variant.Default,
        onTodayButtonClick,
        onSelectionButtonClick
    } = props;

    const thereAreNoControlButtons = onTodayButtonClick === undefined && onSelectionButtonClick === undefined;
    if (thereAreNoControlButtons)
    {
        return null;
    }

    function renderButton(text: string, icon: IconName, onClick: MouseEventHandler): JSX.Element
    {
        return (
            onClick !== undefined && (
                <div className={variant[`controls__button${onClick === null ? "--disabled" : String.EMPTY}`]} onClick={onClick}>
                    <Icon className={variant["controls__icon"]} iconName={icon}/>
                    <div className={variant["controls__text"]}>{text}</div>
                </div>
            )
        );
    }

    return (
        <div className={variant["controls"]}>
            {renderButton("Today", IconName.Flag, onTodayButtonClick)}
            {renderButton("Selection", IconName.Location, onSelectionButtonClick)}
        </div>
    );
}
