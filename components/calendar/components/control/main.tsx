import {Button} from "@miniskylab/antimatter-button";
import {type AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {ControlContext, Props} from "./models";

/**
 * A component that enables users to interact with the calendar.
 */
export function Component({
    style,
    onTodayButtonPress,
    onSelectionButtonPress
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, onTodayButtonPress, onSelectionButtonPress
    };

    const context = useMemo<ControlContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <ControlContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <Button
                    style={computedStyle.Button}
                    disabled={!onTodayButtonPress}
                    icon={DefaultIconSet.Flag}
                    label={"Today"}
                    onPress={onTodayButtonPress}
                />
                <Button
                    style={computedStyle.Button}
                    disabled={!onSelectionButtonPress}
                    icon={DefaultIconSet.Location}
                    label={"Selection"}
                    onPress={onSelectionButtonPress}
                />
            </View>
        </ControlContext.Provider>
    );
}
