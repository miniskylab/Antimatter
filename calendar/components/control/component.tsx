import {Button} from "@miniskylab/antimatter-button";
import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
import React from "react";
import {Props} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    className = "controls",
    onTodayButtonClick,
    onSelectionButtonClick
}: Props): JSX.Element
{
    const thereAreNoControlButtons = onTodayButtonClick === undefined && onSelectionButtonClick === undefined;
    if (thereAreNoControlButtons)
    {
        return null;
    }

    return (
        <div className={className}>
            {onTodayButtonClick !== undefined && (
                <Button
                    className={`${className}__button`}
                    disabled={onTodayButtonClick === null}
                    icon={{name: Icomoon.Flag}}
                    label={{text: "Today"}}
                    onClick={onTodayButtonClick}
                />
            )}
            {onSelectionButtonClick !== undefined && (
                <Button
                    className={`${className}__button`}
                    disabled={onSelectionButtonClick === null}
                    icon={{name: Icomoon.Location}}
                    label={{text: "Selection"}}
                    onClick={onSelectionButtonClick}
                />
            )}
        </div>
    );
}
