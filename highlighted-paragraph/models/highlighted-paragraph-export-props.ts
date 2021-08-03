import {IconName} from "antimatter/icon";
import {Export} from "antimatter/infrastructures";
import {HighlightedParagraphVariant} from "../variants";
import {HighlightedParagraphComponentProps} from "./highlighted-paragraph-component-props";

export type HighlightedParagraphExportProps = Export<HighlightedParagraphComponentProps, HighlightedParagraphVariant, {
    readonly icon?: IconName | string;
}>;
