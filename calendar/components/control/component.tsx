import {Button} from "@miniskylab/antimatter-button";
import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
import {bem} from "@miniskylab/antimatter-model";
import React from "react";
import {Props} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    className,
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
        <div className={bem(className)}>
            {onTodayButtonClick !== undefined && (
                <Button
                    className={bem("Calendar-Controls-Button")}
                    disabled={onTodayButtonClick === null}
                    icon={Icomoon.Flag}
                    label={"Today"}
                    onClick={onTodayButtonClick}
                />
            )}
            {onSelectionButtonClick !== undefined && (
                <Button
                    className={bem("Calendar-Controls-Button")}
                    disabled={onSelectionButtonClick === null}
                    icon={Icomoon.Location}
                    label={"Selection"}
                    onClick={onSelectionButtonClick}
                />
            )}
        </div>
    );
}
