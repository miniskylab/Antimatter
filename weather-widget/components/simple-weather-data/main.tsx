import {AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Text} from "@miniskylab/antimatter-text";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {Props, SimpleWeatherDataContext} from "./models";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    style,
    icon,
    title,
    subtitle,
    highlightColor
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, icon, title, subtitle, highlightColor
    };

    const context = useMemo<SimpleWeatherDataContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <SimpleWeatherDataContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <Icon style={computedStyle.Icon} name={icon}/>
                <View style={computedStyle.TitleContainer}>
                    <Text style={computedStyle.MainTitle}>{title}</Text>
                    <Text style={computedStyle.Subtitle}>{subtitle}</Text>
                </View>
            </View>
        </SimpleWeatherDataContext.Provider>
    );
}
