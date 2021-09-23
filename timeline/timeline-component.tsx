import {Icon, IconName} from "@miniskylab/antimatter/icon";
import {Markdown} from "@miniskylab/antimatter/markdown";
import React, {Component} from "react";
import {Event, EventPosition} from "./components/event";
import {TimelineComponentProps} from "./models/timeline-component-props";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class TimelineComponent extends Component<TimelineComponentProps>
{
    constructor(props: TimelineComponentProps)
    {
        super(props);

        this.state = {
            events: []
        };
    }

    render(): JSX.Element
    {
        return (
            <div className={this.props.variant["timeline"]}>
                <div className={this.props.variant["timeline__event-stream"]}>
                    {this.props.events.map((event, i) => (
                        <Event
                            key={i}
                            position={i % 2 === 0 ? EventPosition.Left : EventPosition.Right}
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
                    <div className={this.props.variant["timeline__vertical-line"]}/>
                    <Icon
                        className={this.props.variant["timeline__origin"]}
                        iconName={IconName.Origin}
                    />
                </div>
                {this.props.bootstrapEvent && (
                    <div className={this.props.variant["timeline__bootstrap-event"]}>
                        <div className={this.props.variant["timeline__bootstrap-event-triangle-arrow"]}/>
                        <Icon
                            className={this.props.variant["timeline__bootstrap-event-icon"]}
                            iconName={this.props.bootstrapEvent.icon}
                        />
                        <div className={this.props.variant["timeline__bootstrap-event-name"]}>
                            {Markdown.render(this.props.bootstrapEvent.name)}
                        </div>
                        <div className={this.props.variant["timeline__bootstrap-event-description"]}>
                            {Markdown.render(this.props.bootstrapEvent.description)}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
