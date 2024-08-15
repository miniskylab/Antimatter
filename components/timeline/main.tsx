import {type AllPropertiesMustPresent, Ts, useComponentContext, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX} from "react";
import {BootstrapEvent, Event} from "./components";
import {TimelineContext, TimelineProps} from "./models";
import * as Variant from "./variants";

/**
 * A chronological arrangement of important events in the order of their occurrence.
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

    const context = useComponentContext<TimelineContext>({props});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <TimelineContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <View style={computedStyle.EventStream}>
                    {events.map((event, i) => <Event.Component key={i} {...event} style={computedStyle.Event} index={i}/>)}
                    {events.length % 2 !== 0 && <View style={computedStyle.EventPlaceholder}/>}
                    <View style={computedStyle.VerticalLine}/>
                    <Icon style={computedStyle.Origin} name={DefaultIconSet.Origin}/>
                </View>
                {bootstrapEvent && <BootstrapEvent.Component {...bootstrapEvent} style={computedStyle.BootstrapEvent}/>}
            </View>
        </TimelineContext.Provider>
    );
}
