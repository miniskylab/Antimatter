import {AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Pressable} from "@miniskylab/antimatter-pressable";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {Status} from "./enums";
import {ToggleContext, ToggleProps} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Toggle({
    style = Variant.Default,
    status = Status.Unchecked,
    icon = DefaultIconSet.Circle,
    onChange
}: ToggleProps): JSX.Element
{
    const props: AllPropertiesMustPresent<ToggleProps> = {
        style, status, icon, onChange
    };

    const context = useMemo<ToggleContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <ToggleContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <Pressable style={computedStyle.Container} onPress={() => { onChange?.(getNewStatus()); }}>
                    <Icon style={computedStyle.Icon} name={icon} selectable={false}/>
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
