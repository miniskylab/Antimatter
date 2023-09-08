import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";
import {ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {HighlightedParagraphStyle} from "../models";

const HighlightedParagraph__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        flexBasis: "100%",
        padding: 20,
        borderWidth: 3,
        borderStyle: "solid",
        borderColor: Color.Gray,
        backgroundColor: Color.Gray__a10
    };
};

const HighlightedParagraph__TitleContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        justifyContent: "flex-start",
        alignSelf: "stretch",
        height: 30
    };
};

const HighlightedParagraph__TitleIcon: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        width: 40,
        paddingRight: 10,
        fontSize: 25,
        color: Color.White
    };
};

const HighlightedParagraph__TitleLabel: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        color: Color.White,
        fontWeight: "bold",
        fontSize: 18
    };
};

const HighlightedParagraph__Gap: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        alignSelf: "stretch",
        height: 12
    };
};

const HighlightedParagraph__Content: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        alignSelf: "flex-start",
        color: Color.White,
        lineHeight: 24,
        fontSize: 14,
        textAlign: "justify"
    };
};

export const Default: HighlightedParagraphStyle = function ()
{
    return {
        Root: HighlightedParagraph__Root,
        TitleContainer: HighlightedParagraph__TitleContainer,
        TitleIcon: HighlightedParagraph__TitleIcon,
        TitleLabel: HighlightedParagraph__TitleLabel,
        Gap: HighlightedParagraph__Gap,
        Content: HighlightedParagraph__Content
    };
};
