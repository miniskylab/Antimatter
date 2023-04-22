import {Button} from "@miniskylab/antimatter-button";
import {IconName} from "@miniskylab/antimatter-icon";
import React, {useMemo} from "react";
import {Animated} from "react-native";
import {ControlContext, Props} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    style,
    onTodayButtonClick,
    onSelectionButtonClick
}: Props): JSX.Element
{
    const props: Required<Props> = {
        style, onTodayButtonClick, onSelectionButtonClick
    };

    const context = useMemo<ControlContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    const thereAreNoControlButtons = onTodayButtonClick === undefined && onSelectionButtonClick === undefined;
    if (thereAreNoControlButtons)
    {
        return null;
    }

    return (
        <ControlContext.Provider value={context}>
            <Animated.View style={computedStyle.Root}>
                {onTodayButtonClick !== undefined && (
                    <Button
                        style={computedStyle.Button}
                        disabled={onTodayButtonClick === null}
                        icon={IconName.Flag}
                        label={"Today"}
                        onClick={onTodayButtonClick}
                    />
                )}
                {onSelectionButtonClick !== undefined && (
                    <Button
                        style={computedStyle.Button}
                        disabled={onSelectionButtonClick === null}
                        icon={IconName.Location}
                        label={"Selection"}
                        onClick={onSelectionButtonClick}
                    />
                )}
            </Animated.View>
        </ControlContext.Provider>
    );
}
