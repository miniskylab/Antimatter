import {AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {BootstrapEvent, Event} from "./components";
import {TimelineContext, TimelineProps} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Timeline({
    style = Variant.Default,
    events = [],
    bootstrapEvent
}: TimelineProps): JSX.Element
{
    const props: AllPropertiesMustPresent<TimelineProps> = {
        style, events, bootstrapEvent
    };

    const context = useMemo<TimelineContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <TimelineContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <View style={computedStyle.EventStream}>
                    {events.map((event, i) => <Event.Component key={i} {...event} style={computedStyle.Event} index={i}/>)}
                    <View style={computedStyle.VerticalLine}/>
                    <Icon style={computedStyle.Origin} name={DefaultIconSet.Origin}/>
                </View>
                {bootstrapEvent && <BootstrapEvent.Component {...bootstrapEvent} style={computedStyle.BootstrapEvent}/>}
            </View>
        </TimelineContext.Provider>
    );
}
