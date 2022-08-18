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
            <div className={this.props.className}>
                {this.props.cards.map((cardProps, i) => (
                    <Card.Component
                        key={i}
                        className={`${this.props.className}__card${cardProps.thisIsPlaceholderCard ? "--placeholder" : String.EMPTY}`}
                        {...cardProps}
                    />
                ))}
            </div>
        );
    }
}
