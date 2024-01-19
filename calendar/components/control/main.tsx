import {Button} from "@miniskylab/antimatter-button";
import {AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
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
}: Props): JSX.Element | null
{
    const props: AllPropertiesMustPresent<Props> = {
        style, onTodayButtonPress, onSelectionButtonPress
    };

    const context = useMemo<ControlContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const computedStyle = useComputedStyle(style, props);

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
