import {Icon} from "@miniskylab/antimatter-icon";
import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
import {Label} from "@miniskylab/antimatter-label";
import React from "react";
import {Event} from "./components";
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
            <div className={this.props.className}>
                <div className={`${this.props.className}__event-stream`}>
                    {this.props.events.map((event, i) => (
                        <Event.Component
                            key={i}
                            className={`${this.props.className}__event`}
                            name={event.name}
                            image={event.image}
                            startDate={event.startDate}
                            endDate={event.endDate}
                            isOnGoing={event.isOnGoing}
                            location={event.location}
                            description={event.description}
                            icon={event.icon}
                            minimumTimeUnit={event.minimumTimeUnit}
                        />
                    ))}
                    <div className={`${this.props.className}__vertical-line`}/>
                    <Icon className={`${this.props.className}__origin`} name={Icomoon.Origin}/>
                </div>
                {this.props.bootstrapEvent && (
                    <div className={`${this.props.className}__bootstrap-event`}>
                        <div className={`${this.props.className}__bootstrap-event__triangle-arrow`}/>
                        <Icon
                            className={`${this.props.className}__bootstrap-event__icon`}
                            name={this.props.bootstrapEvent.icon}
                        />
                        <Label
                            className={`${this.props.className}__bootstrap-event__name`}
                            text={this.props.bootstrapEvent.name}
                        />
                        <Label
                            className={`${this.props.className}__bootstrap-event__description`}
                            text={this.props.bootstrapEvent.description}
                        />
                    </div>
                )}
            </div>
        );
    }
}
