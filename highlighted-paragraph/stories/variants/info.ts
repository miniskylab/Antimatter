import {Color} from "@miniskylab/antimatter-color-scheme";
import {
    HighlightedParagraphContextHook,
    HighlightedParagraphStyle,
    HighlightedParagraphVariant
} from "@miniskylab/antimatter-highlighted-paragraph";
import {ViewStyle} from "@miniskylab/antimatter-view";

const HighlightedParagraph__Root: ViewStyle = function (viewProps)
{
    const highlightedParagraphContext = HighlightedParagraphContextHook.useHighlightedParagraphContext();

    const inheritedStyle = HighlightedParagraphVariant.Default(highlightedParagraphContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        borderColor: Color.Primary,
        backgroundColor: Color.Primary__a10
    };
};

export const Info: HighlightedParagraphStyle = function (highlightedParagraphProps)
{
    return {
        ...HighlightedParagraphVariant.Default(highlightedParagraphProps),
        Root: HighlightedParagraph__Root
    };
};
