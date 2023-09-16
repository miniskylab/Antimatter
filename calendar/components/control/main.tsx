import {Button} from "@miniskylab/antimatter-button";
import {useComputedStyle} from "@miniskylab/antimatter-framework";
import {IconName} from "@miniskylab/antimatter-icon";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {ControlContext, Props} from "./models";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    style,
    onTodayButtonPress,
    onSelectionButtonPress
}: Props): JSX.Element
{
    const props: Required<Props> = {
        style, onTodayButtonPress, onSelectionButtonPress
    };

    const context = useMemo<ControlContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const computedStyle = useComputedStyle(style, props);

    const thereAreNoControlButtons = onTodayButtonPress === undefined && onSelectionButtonPress === undefined;
    if (thereAreNoControlButtons)
    {
        return null;
    }

    return (
        <ControlContext.Provider value={context}>
            <View style={computedStyle.Root}>
                {onTodayButtonPress !== undefined && (
                    <Button
                        style={computedStyle.Button}
                        disabled={onTodayButtonPress === null}
                        icon={IconName.Flag}
                        label={"Today"}
                        onPress={onTodayButtonPress}
                    />
                )}
                {onSelectionButtonPress !== undefined && (
                    <Button
                        style={computedStyle.Button}
                        disabled={onSelectionButtonPress === null}
                        icon={IconName.Location}
                        label={"Selection"}
                        onPress={onSelectionButtonPress}
                    />
                )}
            </View>
        </ControlContext.Provider>
    );
}
