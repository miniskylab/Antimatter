import {Icon} from "@miniskylab/antimatter-icon";
import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
import {bem} from "@miniskylab/antimatter-model";
import React from "react";
import {BootstrapEvent, Event} from "./components";
import {TimelineProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class Timeline extends React.Component<TimelineProps>
{
    static defaultProps: Partial<TimelineProps> = {
        events: []
    };

    constructor(props: TimelineProps)
    {
        super(props);

        this.state = {
            events: []
        };
    }

    render(): JSX.Element
    {
        return (
            <div className={bem(this.props.className)}>
                <div className={bem(this.props.className, "EventStream")}>
                    {this.props.events.map((event, i) => (
                        <Event.Component
                            key={i}
                            {...event}
                            className={bem("Timeline-Event")}
                        />
                    ))}
                    <div className={bem(this.props.className, "VerticalLine")}/>
                    <Icon className={bem("Timeline-Origin")} name={Icomoon.Origin}/>
                </div>
                {this.props.bootstrapEvent && (
                    <BootstrapEvent.Component
                        {...this.props.bootstrapEvent}
                        className={bem("Timeline-BootstrapEvent")}
                    />
                )}
            </div>
        );
    }
}
