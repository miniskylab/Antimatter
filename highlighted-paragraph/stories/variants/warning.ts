import {Color} from "@miniskylab/antimatter-color-scheme";
import {
    HighlightedParagraphContextHook,
    HighlightedParagraphStyle,
    HighlightedParagraphVariant
} from "@miniskylab/antimatter-highlighted-paragraph";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {ViewStyle} from "@miniskylab/antimatter-view";

const HighlightedParagraph__Root: ViewStyle = function (viewProps)
{
    const highlightedParagraphContext = HighlightedParagraphContextHook.useHighlightedParagraphContext();

    const inheritedStyle = HighlightedParagraphVariant.Default(highlightedParagraphContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        borderColor: Color.Warning,
        backgroundColor: Color.Warning__a10
    };
};

const HighlightedParagraph__TitleIcon: IconStyle = function (iconProps)
{
    const highlightedParagraphContext = HighlightedParagraphContextHook.useHighlightedParagraphContext();

    const inheritedStyle = HighlightedParagraphVariant.Default(highlightedParagraphContext.props).TitleIcon(iconProps);

    return {
        ...inheritedStyle,
        color: Color.Warning
    };
};

export const Warning: HighlightedParagraphStyle = function (highlightedParagraphProps)
{
    return {
        ...HighlightedParagraphVariant.Default(highlightedParagraphProps),
        Root: HighlightedParagraph__Root,
        TitleIcon: HighlightedParagraph__TitleIcon
    };
};
