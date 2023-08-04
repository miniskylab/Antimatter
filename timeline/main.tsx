import {Icon, IconName} from "@miniskylab/antimatter-icon";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {BootstrapEvent, Event} from "./component";
import {TimelineContext, TimelineProps} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Timeline({
    style = Variant.Default,
    events = [],
    bootstrapEvent
}: TimelineProps): JSX.Element
{
    const props: Required<TimelineProps> = {
        style, events, bootstrapEvent
    };

    const context = useMemo<TimelineContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    return (
        <TimelineContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <View style={computedStyle.EventStream}>
                    {events.map((event, i) => <Event.Component key={i} {...event} style={computedStyle.Event} index={i}/>)}
                    <View style={computedStyle.VerticalLine}/>
                    <Icon style={computedStyle.Origin} name={IconName.Origin}/>
                </View>
                {bootstrapEvent && <BootstrapEvent.Component {...bootstrapEvent} style={computedStyle.BootstrapEvent}/>}
            </View>
        </TimelineContext.Provider>
    );
}
