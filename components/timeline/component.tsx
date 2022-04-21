import {Html} from "@miniskylab/antimatter-html";
import {Icon, IconName} from "@miniskylab/antimatter-icon";
import React, {Component} from "react";
import {Event, Position} from "./components/event";
import {Props} from "./models/props";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class Timeline extends Component<Props>
{
    static defaultProps: Partial<Props> = {
        variant: Variant.Default,
        events: []
    };

    constructor(props: Props)
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
                            position={i % 2 === 0 ? Position.Left : Position.Right}
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
                    <Icon className={this.props.variant["timeline__origin"]} iconName={IconName.Origin}/>
                </div>
                {this.props.bootstrapEvent && (
                    <div className={this.props.variant["timeline__bootstrap-event"]}>
                        <div className={this.props.variant["timeline__bootstrap-event-triangle-arrow"]}/>
                        <Icon className={this.props.variant["timeline__bootstrap-event-icon"]} iconName={this.props.bootstrapEvent.icon}/>
                        <div className={this.props.variant["timeline__bootstrap-event-name"]}>
                            {Html.render(this.props.bootstrapEvent.name)}
                        </div>
                        <div className={this.props.variant["timeline__bootstrap-event-description"]}>
                            {Html.render(this.props.bootstrapEvent.description)}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
