import {type AllPropertiesMustPresent, Ts, useComponentContext, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Pressable} from "@miniskylab/antimatter-pressable";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX} from "react";
import {Status} from "./enums";
import {ToggleContext, ToggleProps} from "./models";
import * as Variant from "./variants";

/**
 * A component that allows users to switch between two mutually exclusive states (for example: ***On*** and ***Off***).
 */
export function Toggle({
    style = Variant.Default,
    status = Status.Unchecked,
    icon = DefaultIconSet.Circle,
    disabled = false,
    onChange
}: ToggleProps): JSX.Element
{
    const props: AllPropertiesMustPresent<ToggleProps> = {
        style, status, icon, disabled, onChange
    };

    const context = useComponentContext<ToggleContext>({props});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <ToggleContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <Pressable style={computedStyle.Container} onPress={() => { onChange?.(getNewStatus()); }} disabled={disabled}>
                    <Icon style={computedStyle.Icon} name={icon} selectable={false} pointerEvents={"none"}/>
                </Pressable>
            </View>
        </ToggleContext.Provider>
    );

    function getNewStatus(): Status
    {
        switch (status)
        {
            case Status.Checked:
                return Status.Unchecked;

            default:
                return Status.Checked;
        }
    }
}
