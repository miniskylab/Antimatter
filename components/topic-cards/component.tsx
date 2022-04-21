import {ComponentStyles} from "@miniskylab/antimatter-component";
import React, {Component} from "react";
import {Card, Variant as CardVariant} from "./components/card";
import {Props} from "./models/props";
import * as TopicCardsVariant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class Timeline extends Component<Props>
{
    static defaultProps: Partial<Props> = {
        variant: TopicCardsVariant.ThreeColumns,
        cards: []
    };

    render(): JSX.Element
    {
        return (
            <div className={this.props.variant["topic-cards"]}>
                <div className={this.props.variant["topic-cards__container"]}>
                    {[...this.props.cards].map((x, i) => (
                        <Card
                            key={i}
                            variant={x.variant || this.getCardVariant(x.thisIsPlaceholderCard)}
                            icon={x.icon}
                            name={x.name}
                            description={x.description}
                            thisIsPlaceholderCard={x.thisIsPlaceholderCard}
                            ctaButtons={x.ctaButtons}
                        />
                    ))}
                </div>
            </div>
        );
    }

    private getCardVariant(isPlaceholderCard: boolean): ComponentStyles
    {
        switch (this.props.variant)
        {
            case null:
            case undefined:
            case TopicCardsVariant.ThreeColumns:
                return isPlaceholderCard
                    ? CardVariant.ThirtyThreePercentWideInvisiblePlaceholder
                    : CardVariant.ThirtyThreePercentWide;

            case TopicCardsVariant.FourColumns:
                return isPlaceholderCard
                    ? CardVariant.TwentyFivePercentWideVisiblePlaceholder
                    : CardVariant.TwentyFivePercentWide;
        }
    }
}
