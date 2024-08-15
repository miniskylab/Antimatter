import {Button} from "@miniskylab/antimatter-button";
import {type AllPropertiesMustPresent, Ts, useComponentContext, useComputedStyle} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX} from "react";
import {ControlContext, type Props} from "./models";

export function Component({
    style,
    onTodayButtonPress,
    onSelectionButtonPress
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, onTodayButtonPress, onSelectionButtonPress
    };

    const context = useComponentContext<ControlContext>({props});

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
