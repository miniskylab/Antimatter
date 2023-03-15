import {Button} from "@miniskylab/antimatter-button";
import {IconName} from "@miniskylab/antimatter-icon";
import React from "react";
import {Animated} from "react-native";
import {Props} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    style,
    onTodayButtonClick,
    onSelectionButtonClick
}: Props): JSX.Element
{
    const Style = style({onTodayButtonClick, onSelectionButtonClick});

    const thereAreNoControlButtons = onTodayButtonClick === undefined && onSelectionButtonClick === undefined;
    if (thereAreNoControlButtons)
    {
        return null;
    }

    return (
        <Animated.View style={Style.Root}>
            {onTodayButtonClick !== undefined && (
                <Button
                    style={Style.Button}
                    disabled={onTodayButtonClick === null}
                    icon={IconName.Flag}
                    label={"Today"}
                    onClick={onTodayButtonClick}
                />
            )}
            {onSelectionButtonClick !== undefined && (
                <Button
                    style={Style.Button}
                    disabled={onSelectionButtonClick === null}
                    icon={IconName.Location}
                    label={"Selection"}
                    onClick={onSelectionButtonClick}
                />
            )}
        </Animated.View>
    );
}
