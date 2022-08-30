import {bem} from "@miniskylab/antimatter-model";
import React from "react";
import {Card} from "./components";
import {TopicCardsProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class TopicCards extends React.Component<TopicCardsProps>
{
    static defaultProps: Partial<TopicCardsProps> = {};

    render(): JSX.Element
    {
        return (
            <div className={bem(this.props.className)}>
                {this.props.cards.map((cardProps, i) => (
                    <Card.Component
                        key={i}
                        {...cardProps}
                        className={bem("TopicCards-Card", null, cardProps.thisIsPlaceholderCard && "Placeholder")}
                    />
                ))}
            </div>
        );
    }
}
