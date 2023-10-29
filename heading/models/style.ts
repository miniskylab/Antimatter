import {Styled} from "@miniskylab/antimatter-framework";
import {HighlightedParagraphStyle} from "@miniskylab/antimatter-highlighted-paragraph";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {HeadingProps} from "./props";

export type HeadingStyle = (headingProps: Styled<HeadingProps>) => {
    Root?: ViewStyle;
    Title?: LabelStyle;
    Hr?: ViewStyle;
    Subtitle?: HighlightedParagraphStyle;
}
