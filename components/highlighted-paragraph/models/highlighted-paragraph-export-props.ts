import {ComponentExportProps} from "@miniskylab/antimatter-component";
import {IconName} from "@miniskylab/antimatter-icon";
import {HighlightedParagraphVariant} from "../variants";
import {HighlightedParagraphComponentProps} from "./highlighted-paragraph-component-props";

export type HighlightedParagraphExportProps = ComponentExportProps<HighlightedParagraphComponentProps, HighlightedParagraphVariant, {
    readonly icon?: IconName | string;
}>;
