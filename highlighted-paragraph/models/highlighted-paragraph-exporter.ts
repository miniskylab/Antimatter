import {IconName} from "@miniskylab/antimatter/icon";
import {ComponentExporter, CSS, Enum} from "@miniskylab/antimatter/infrastructures";
import {ClassConstructor} from "class-transformer";
import {DefaultHighlightedParagraphVariant, HighlightedParagraphVariant} from "../variants";
import {HighlightedParagraphComponentProps} from "./highlighted-paragraph-component-props";
import {HighlightedParagraphExportProps} from "./highlighted-paragraph-export-props";

export class HighlightedParagraphExporter extends ComponentExporter<HighlightedParagraphExportProps>
{
    protected get PropsType(): ClassConstructor<HighlightedParagraphComponentProps>
    {
        return HighlightedParagraphComponentProps;
    }

    protected get DefaultProps(): Partial<HighlightedParagraphComponentProps>
    {
        return {
            icon: undefined,
            title: String.EMPTY,
            text: String.EMPTY
        };
    }

    protected deserialize(highlightedParagraphExportProps: HighlightedParagraphExportProps): HighlightedParagraphExportProps
    {
        return {
            ...highlightedParagraphExportProps,
            icon: Enum.getValue(IconName, highlightedParagraphExportProps.icon)
        };
    }

    protected getVariant(highlightedParagraphExportProps: HighlightedParagraphExportProps): CSS
    {
        switch (Enum.getValue(HighlightedParagraphVariant, highlightedParagraphExportProps.variant))
        {
            case null:
            case undefined:
            case HighlightedParagraphVariant.Default:
                return DefaultHighlightedParagraphVariant;

            default:
                return highlightedParagraphExportProps.variant as CSS;
        }
    }
}
