import {Color} from "@miniskylab/antimatter-color-scheme";
import {
    HighlightedParagraphContextHook,
    HighlightedParagraphStyle,
    HighlightedParagraphVariant
} from "@miniskylab/antimatter-highlighted-paragraph";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";
import {ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {HeadingStyle} from "../models";

const Heading__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        flexDirection: "column",
        minWidth: 300
    };
};

const Heading__Title: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        justifyContent: "flex-start",
        height: 60,
        color: Color.White,
        fontSize: 34,
        fontWeight: "bold"
    };
};

const Heading__Hr: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        width: 80,
        height: 4,
        marginBottom: 30,
        backgroundColor: Color.Primary
    };
};

const Heading__Subtitle__Root: ViewStyle = function (viewProps)
{
    const highlightedParagraphContext = HighlightedParagraphContextHook.useHighlightedParagraphContext();

    const inheritedStyle = HighlightedParagraphVariant.Default(highlightedParagraphContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        paddingVertical: 12,
        paddingHorizontal: 30
    };
};

const Heading__Subtitle__Content: LabelStyle = function (labelProps)
{
    const highlightedParagraphContext = HighlightedParagraphContextHook.useHighlightedParagraphContext();

    const inheritedStyle = HighlightedParagraphVariant.Default(highlightedParagraphContext.props).Content(labelProps);

    return {
        ...inheritedStyle,
        lineHeight: 20,
        color: Color.Neutral
    };
};

const Heading__Subtitle: HighlightedParagraphStyle = function (highlightedParagraphProps)
{
    return {
        ...HighlightedParagraphVariant.Default(highlightedParagraphProps),
        Root: Heading__Subtitle__Root,
        Content: Heading__Subtitle__Content
    };
};

export const Default: HeadingStyle = function ()
{
    return {
        Root: Heading__Root,
        Title: Heading__Title,
        Hr: Heading__Hr,
        Subtitle: Heading__Subtitle
    };
};
