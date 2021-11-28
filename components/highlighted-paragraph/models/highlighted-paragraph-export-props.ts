import {IconName} from "@miniskylab/antimatter-icon";
import {ComponentExportProps} from "@miniskylab/antimatter-component";
import {HighlightedParagraphVariant} from "../variants";
import {HighlightedParagraphComponentProps} from "./highlighted-paragraph-component-props";

export type HighlightedParagraphExportProps = ComponentExportProps<HighlightedParagraphComponentProps, HighlightedParagraphVariant, {
    readonly icon?: IconName | string;
}>;
