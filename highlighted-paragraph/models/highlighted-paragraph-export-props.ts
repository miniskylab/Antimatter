import {IconName} from "@miniskylab/antimatter/icon";
import {Export} from "@miniskylab/antimatter/infrastructure";
import {HighlightedParagraphVariant} from "../variants";
import {HighlightedParagraphComponentProps} from "./highlighted-paragraph-component-props";

export type HighlightedParagraphExportProps = Export<HighlightedParagraphComponentProps, HighlightedParagraphVariant, {
    readonly icon?: IconName | string;
}>;
