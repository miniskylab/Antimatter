import {AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Text} from "@miniskylab/antimatter-text";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {BootstrapEventContext, Props} from "./models";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    style,
    icon,
    name,
    description
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, icon, name, description
    };

    const context = useMemo<BootstrapEventContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <BootstrapEventContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <View style={computedStyle.TriangleArrow}/>
                <Icon style={computedStyle.Icon} name={icon}/>
                <Text style={computedStyle.Name}>{name}</Text>
                <Text style={computedStyle.Description}>{description}</Text>
            </View>
        </BootstrapEventContext.Provider>
    );
}
