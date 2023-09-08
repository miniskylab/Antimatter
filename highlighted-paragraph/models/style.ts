import {Styled} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {HighlightedParagraphProps} from "./props";

export type HighlightedParagraphStyle = (highlightedParagraphProps: Styled<HighlightedParagraphProps>) => {
    Root?: ViewStyle;
    TitleContainer?: ViewStyle;
    TitleIcon?: IconStyle;
    TitleLabel?: LabelStyle;
    Gap?: ViewStyle;
    Content?: LabelStyle;
};
