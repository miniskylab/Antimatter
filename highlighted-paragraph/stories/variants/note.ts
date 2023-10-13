import {Color} from "@miniskylab/antimatter-color-scheme";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {HighlightedParagraphContextHook} from "../../hooks";
import {HighlightedParagraphStyle} from "../../models";
import * as HighlightedParagraphVariant from "../../variants";

const HighlightedParagraph__Root: ViewStyle = function (viewProps)
{
    const highlightedParagraphContext = HighlightedParagraphContextHook.useHighlightedParagraphContext();

    const inheritedStyle = HighlightedParagraphVariant.Default(highlightedParagraphContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        borderColor: Color.Accent,
        backgroundColor: Color.Accent
    };
};

export const Note: HighlightedParagraphStyle = function (highlightedParagraphProps)
{
    return {
        ...HighlightedParagraphVariant.Default(highlightedParagraphProps),
        Root: HighlightedParagraph__Root
    };
};
