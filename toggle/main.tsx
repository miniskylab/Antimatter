import {Icon, IconName} from "@miniskylab/antimatter-icon";
import {Pressable} from "@miniskylab/antimatter-pressable";
import React, {JSX, useMemo} from "react";
import {Status} from "./enum";
import {ToggleContext, ToggleProps} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Toggle({
    style = Variant.Default,
    status = Status.Unchecked,
    icon = IconName.Circle,
    onChange
}: ToggleProps): JSX.Element
{
    const props: Required<ToggleProps> = {
        style, status, icon, onChange
    };

    const context = useMemo<ToggleContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    return (
        <ToggleContext.Provider value={context}>
            <Pressable style={computedStyle.Root} onPress={() => { onChange?.(getNewStatus()); }}>
                <Icon style={computedStyle.Icon} name={icon} selectable={false}/>
            </Pressable>
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
