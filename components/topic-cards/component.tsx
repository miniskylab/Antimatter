import React from "react";
import {Card} from "./components";
import {Props} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class Component extends React.Component<Props>
{
    static defaultProps: Partial<Props> = {
        variant: Variant.ThreeColumns,
        cards: []
    };

    render(): JSX.Element
    {
        return (
            <div className={this.props.variant["topic-cards"]}>
                <div className={this.props.variant["topic-cards__container"]}>
                    {[...this.props.cards].map((x, i) => (
                        <Card.Component
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

    private getCardVariant(isPlaceholderCard: boolean): Record<string, string>
    {
        switch (this.props.variant)
        {
            case null:
            case undefined:
            case Variant.ThreeColumns:
                return isPlaceholderCard
                    ? Card.Variant.ThirtyThreePercentWideInvisiblePlaceholder
                    : Card.Variant.ThirtyThreePercentWide;

            case Variant.FourColumns:
                return isPlaceholderCard
                    ? Card.Variant.TwentyFivePercentWideVisiblePlaceholder
                    : Card.Variant.TwentyFivePercentWide;
        }
    }
}
