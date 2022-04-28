import {Html} from "@miniskylab/antimatter-html";
import {Icon, IconName} from "@miniskylab/antimatter-icon";
import React from "react";
import {Event} from "./components";
import {Props} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class Component extends React.Component<Props>
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
                        <Event.Component
                            key={i}
                            position={i % 2 === 0 ? Event.Position.Left : Event.Position.Right}
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
