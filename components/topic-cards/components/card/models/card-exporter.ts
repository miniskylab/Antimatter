import {ComponentExporter, ComponentStyles} from "@miniskylab/antimatter-component";
import {IconName} from "@miniskylab/antimatter-icon";
import {Enum} from "@miniskylab/antimatter-typescript";
import {ClassConstructor} from "class-transformer";
import {
    CardVariant,
    ThirtyThreePercentWideCardVariant,
    ThirtyThreePercentWideInvisiblePlaceholderCardVariant,
    TwentyFivePercentWideCardVariant,
    TwentyFivePercentWideVisiblePlaceholderCardVariant
} from "../variants";
import {CardComponentProps} from "./card-component-props";
import {CardExportProps} from "./card-export-props";

export class CardExporter extends ComponentExporter<CardExportProps>
{
    protected get PropsType(): ClassConstructor<CardComponentProps>
    {
        return CardComponentProps;
    }

    protected get DefaultProps(): Partial<CardComponentProps>
    {
        return {
            icon: undefined,
            name: String.EMPTY,
            description: String.EMPTY,
            thisIsPlaceholderCard: false,
            ctaButtons: []
        };
    }

    protected deserialize(cardExportProps: CardExportProps): CardExportProps
    {
        return {
            ...cardExportProps,
            icon: Enum.getValue(IconName, cardExportProps.icon)
        };
    }

    protected getVariant(cardExportProps: CardExportProps): ComponentStyles
    {
        switch (Enum.getValue(CardVariant, cardExportProps.variant))
        {
            case null:
            case undefined:
            case CardVariant.ThirtyThreePercentWide:
                return ThirtyThreePercentWideCardVariant;

            case CardVariant.ThirtyThreePercentWideInvisiblePlaceholder:
                return ThirtyThreePercentWideInvisiblePlaceholderCardVariant;

            case CardVariant.TwentyFivePercentWide:
                return TwentyFivePercentWideCardVariant;

            case CardVariant.TwentyFivePercentWideVisiblePlaceholder:
                return TwentyFivePercentWideVisiblePlaceholderCardVariant;

            default:
                return cardExportProps.variant as ComponentStyles;
        }
    }
}
