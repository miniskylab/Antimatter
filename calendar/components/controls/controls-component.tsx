import {Icon, IconName} from "antimatter/icon";
import React, {MouseEventHandler} from "react";
import {ControlsComponentProps} from "./models/controls-component-props";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function ControlsComponent(props: ControlsComponentProps): JSX.Element
{
    const thereAreNoControlButtons = props.onTodayButtonClicked === undefined && props.onSelectionButtonClicked === undefined;
    if (thereAreNoControlButtons)
    {
        return null;
    }

    function renderButton(text: string, icon: IconName, onClick: MouseEventHandler): JSX.Element
    {
        return (
            onClick !== undefined && (
                <div
                    className={props.variant[`controls__button${onClick === null ? "--disabled" : String.EMPTY}`]}
                    onClick={onClick}
                >
                    <Icon
                        className={props.variant["controls__icon"]}
                        iconName={icon}
                    />
                    <div className={props.variant["controls__text"]}>{text}</div>
                </div>
            )
        );
    }

    return (
        <div className={props.variant["controls"]}>
            {renderButton("Today", IconName.Flag, props.onTodayButtonClicked)}
            {renderButton("Selection", IconName.Location, props.onSelectionButtonClicked)}
        </div>
    );
}
