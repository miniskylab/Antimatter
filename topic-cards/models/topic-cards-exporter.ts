import {ComponentExporter, CSS, Enum} from "@miniskylab/antimatter/infrastructures";
import {ClassConstructor} from "class-transformer";
import {createElement} from "react";
import {CardProps, CardVariant} from "../components/card";
import {OneThousandPixelWideTopicCardsVariant, TopicCardsVariant, TwelveHundredPixelWideTopicCardsVariant} from "../variants";
import {TopicCardsComponentProps} from "./topic-cards-component-props";
import {TopicCardsComponentType} from "./topic-cards-component-type";
import {TopicCardsExportProps} from "./topic-cards-export-props";

export class TopicCardsExporter extends ComponentExporter<TopicCardsExportProps>
{
    protected get PropsType(): ClassConstructor<TopicCardsComponentProps>
    {
        return TopicCardsComponentProps;
    }

    protected get DefaultProps(): Partial<TopicCardsComponentProps>
    {
        return {
            cards: []
        };
    }

    private static getCardVariant(topicCardsVariant: TopicCardsExportProps["variant"], cardProps: CardProps): CardProps["variant"]
    {
        if (cardProps.variant)
        {
            return cardProps.variant;
        }

        switch (topicCardsVariant)
        {
            case null:
            case undefined:
            case TopicCardsVariant.ThreeColumns:
                return cardProps.thisIsPlaceholderCard
                    ? CardVariant.ThirtyThreePercentWideInvisiblePlaceholder
                    : CardVariant.ThirtyThreePercentWide;

            case TopicCardsVariant.FourColumns:
                return cardProps.thisIsPlaceholderCard
                    ? CardVariant.TwentyFivePercentWideVisiblePlaceholder
                    : CardVariant.TwentyFivePercentWide;
        }
    }

    protected getHigherOrderComponents(): ((topicCardsComponent: TopicCardsComponentType) => TopicCardsComponentType)[]
    {
        return [this.autoSelectCardsVariant];
    }

    protected deserialize(topicCardsExportProps: TopicCardsExportProps): TopicCardsExportProps
    {
        return {
            ...topicCardsExportProps
        };
    }

    protected getVariant(topicCardsExportProps: TopicCardsExportProps): CSS
    {
        switch (Enum.getValue(TopicCardsVariant, topicCardsExportProps.variant))
        {
            case null:
            case undefined:
            case TopicCardsVariant.ThreeColumns:
                return OneThousandPixelWideTopicCardsVariant;

            case TopicCardsVariant.FourColumns:
                return TwelveHundredPixelWideTopicCardsVariant;

            default:
                return topicCardsExportProps.variant as CSS;
        }
    }

    private autoSelectCardsVariant(topicCardsComponent: TopicCardsComponentType): TopicCardsComponentType
    {
        return function _(topicCardsExportProps: TopicCardsExportProps): JSX.Element
        {
            const topicCardsVariant = Enum.getValue(TopicCardsVariant, topicCardsExportProps.variant);
            topicCardsExportProps = {
                ...topicCardsExportProps,
                cards: topicCardsExportProps.cards.map(cardProps => ({
                    ...cardProps,
                    variant: TopicCardsExporter.getCardVariant(topicCardsVariant, cardProps)
                }))
            };

            return createElement(topicCardsComponent, topicCardsExportProps);
        }.bind(this);
    }
}
