import {ButtonContextHook} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {DownloadButtonContextHook, DownloadButtonStyle, DownloadButtonVariant} from "@miniskylab/antimatter-download-button";
import {ScreenSize, useScreenSize} from "@miniskylab/antimatter-framework";
import {
    HighlightedParagraphContextHook,
    HighlightedParagraphStyle,
    HighlightedParagraphVariant
} from "@miniskylab/antimatter-highlighted-paragraph";
import {IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {ImageStyle, ImageVariant} from "@miniskylab/antimatter-image";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";
import {PressableStyle} from "@miniskylab/antimatter-pressable";
import {ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {SelfIntroductionHeroContextHook} from "../hook";
import {SelfIntroductionHeroStyle} from "../model";

const SelfIntroductionHero__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        flexBasis: ScreenSize.ExtraLarge,
        flexDirection: "column",
        minWidth: 300
    };
};

const SelfIntroductionHero__CoverPhoto: ImageStyle = function (imageProps)
{
    return {
        ...ImageVariant.Default(imageProps),
        width: "100%",
        height: 300,
        objectFit: "cover"
    };
};

const SelfIntroductionHero__Banner: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        justifyContent: "flex-start",
        width: "100%",
        height: 70,
        backgroundColor: Color.Background
    };
};

const SelfIntroductionHero__AvatarContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        top: -100,
        width: 200,
        height: 200,
        padding: 5,
        borderRadius: 100,
        borderWidth: 10,
        borderStyle: "solid",
        borderColor: Color.White
    };
};

const SelfIntroductionHero__Avatar: ImageStyle = function (imageProps)
{
    return {
        ...ImageVariant.Default(imageProps),
        width: "100%",
        height: "100%",
        borderRadius: 100
    };
};

const SelfIntroductionHero__Name: LabelStyle = function (labelProps)
{
    const ifViewportSizeIsGreaterThanOrEqualToSmallBreakpoint = useScreenSize(ScreenSize.Small);

    return {
        ...LabelVariant.Default(labelProps),
        alignSelf: "stretch",
        height: 50,
        marginTop: 45,
        fontSize: 40,
        fontWeight: "bold",
        color: Color.White,
        ...ifViewportSizeIsGreaterThanOrEqualToSmallBreakpoint && {
            height: 60,
            fontSize: 50
        }
    };
};

const SelfIntroductionHero__AlternativeName: LabelStyle = function (labelProps)
{
    const ifViewportSizeIsGreaterThanOrEqualToSmallBreakpoint = useScreenSize(ScreenSize.Small);

    return {
        ...LabelVariant.Default(labelProps),
        alignSelf: "stretch",
        height: 40,
        fontSize: 28,
        fontWeight: "bold",
        color: Color.White,
        ...ifViewportSizeIsGreaterThanOrEqualToSmallBreakpoint && {
            height: 50,
            fontSize: 38
        }
    };
};

const SelfIntroductionHero__Description: LabelStyle = function (labelProps)
{
    const ifViewportSizeIsGreaterThanOrEqualToSmallBreakpoint = useScreenSize(ScreenSize.Small);
    const ifViewportSizeIsGreaterThanOrEqualToMediumBreakpoint = useScreenSize(ScreenSize.Medium);

    return {
        ...LabelVariant.Default(labelProps),
        width: "100%",
        lineHeight: 30,
        paddingVertical: 20,
        paddingHorizontal: 15,
        fontSize: 20,
        color: Color.Neutral,
        textAlign: "justify",
        ...ifViewportSizeIsGreaterThanOrEqualToSmallBreakpoint && {
            width: 580,
            paddingVertical: 30,
            paddingHorizontal: 20
        },
        ...ifViewportSizeIsGreaterThanOrEqualToMediumBreakpoint && {
            width: 740
        }
    };
};

const SelfIntroductionHero__PersonalInfo__Root: ViewStyle = function (viewProps)
{
    const personalInfoContext = SelfIntroductionHeroContextHook.usePersonalInfoContext();
    const highlightedParagraphContext = HighlightedParagraphContextHook.useHighlightedParagraphContext();

    const ifViewportSizeIsGreaterThanOrEqualToSmallBreakpoint = useScreenSize(ScreenSize.Small);
    const ifViewportSizeIsGreaterThanOrEqualToMediumBreakpoint = useScreenSize(ScreenSize.Medium);

    const inheritedStyle = HighlightedParagraphVariant.Default(highlightedParagraphContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        alignSelf: "stretch",
        paddingTop: 6,
        paddingBottom: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        marginHorizontal: 15,
        ...personalInfoContext === "email" && {
            borderColor: Color.Primary,
            backgroundColor: Color.Primary__a10
        },
        ...ifViewportSizeIsGreaterThanOrEqualToSmallBreakpoint && {
            alignSelf: "center",
            position: "absolute",
            top: 300,
            width: 168,
            height: 70,
            paddingTop: 0,
            paddingBottom: 0,
            paddingHorizontal: 0,
            marginTop: 0,
            marginHorizontal: 0,
            marginLeft: personalInfoContext === "location" ? -370 : 370,
            borderWidth: 0,
            backgroundColor: Color.Transparent
        },
        ...ifViewportSizeIsGreaterThanOrEqualToMediumBreakpoint && {
            width: 200,
            marginLeft: personalInfoContext === "location" ? -500 : 500
        }
    };
};

const SelfIntroductionHero__PersonalInfo__TitleContainer: ViewStyle = function (viewProps)
{
    const highlightedParagraphContext = HighlightedParagraphContextHook.useHighlightedParagraphContext();

    const ifViewportSizeIsGreaterThanOrEqualToSmallBreakpoint = useScreenSize(ScreenSize.Small);

    const inheritedStyle = HighlightedParagraphVariant.Default(highlightedParagraphContext.props).TitleContainer(viewProps);

    return {
        ...inheritedStyle,
        justifyContent: "center",
        ...ifViewportSizeIsGreaterThanOrEqualToSmallBreakpoint && {
            height: 37
        }
    };
};

const SelfIntroductionHero__PersonalInfo__TitleLabel: LabelStyle = function (labelProps)
{
    const highlightedParagraphContext = HighlightedParagraphContextHook.useHighlightedParagraphContext();

    const ifViewportSizeIsGreaterThanOrEqualToSmallBreakpoint = useScreenSize(ScreenSize.Small);
    const ifViewportSizeIsGreaterThanOrEqualToMediumBreakpoint = useScreenSize(ScreenSize.Medium);

    const inheritedStyle = HighlightedParagraphVariant.Default(highlightedParagraphContext.props).TitleLabel(labelProps);

    return {
        ...inheritedStyle,
        fontSize: 16,
        color: Color.Neutral,
        ...ifViewportSizeIsGreaterThanOrEqualToSmallBreakpoint && {
            fontSize: 17,
            fontWeight: "bold"
        },
        ...ifViewportSizeIsGreaterThanOrEqualToMediumBreakpoint && {
            fontSize: 20
        }
    };
};

const SelfIntroductionHero__PersonalInfo__TitleIcon: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        display: "none"
    };
};

const SelfIntroductionHero__PersonalInfo__Gap: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        display: "none"
    };
};

const SelfIntroductionHero__PersonalInfo__Content: LabelStyle = function (labelProps)
{
    const highlightedParagraphContext = HighlightedParagraphContextHook.useHighlightedParagraphContext();

    const ifViewportSizeIsGreaterThanOrEqualToSmallBreakpoint = useScreenSize(ScreenSize.Small);
    const ifViewportSizeIsGreaterThanOrEqualToMediumBreakpoint = useScreenSize(ScreenSize.Medium);

    const inheritedStyle = HighlightedParagraphVariant.Default(highlightedParagraphContext.props).Content(labelProps);

    return {
        ...inheritedStyle,
        alignSelf: "stretch",
        fontSize: 20,
        fontWeight: "bold",
        ...ifViewportSizeIsGreaterThanOrEqualToSmallBreakpoint && {
            height: 33,
            lineHeight: 20,
            fontSize: 17,
            fontWeight: "bold",
            color: Color.White,
            justifyContent: "flex-start",
            borderBottomWidth: 4,
            borderBottomStyle: "solid",
            borderBottomColor: Color.Primary
        },
        ...ifViewportSizeIsGreaterThanOrEqualToMediumBreakpoint && {
            fontSize: 20
        }
    };
};

const SelfIntroductionHero__PersonalInfo: HighlightedParagraphStyle = function (highlightedParagraphProps)
{
    return {
        ...HighlightedParagraphVariant.Default(highlightedParagraphProps),
        Root: SelfIntroductionHero__PersonalInfo__Root,
        TitleContainer: SelfIntroductionHero__PersonalInfo__TitleContainer,
        TitleIcon: SelfIntroductionHero__PersonalInfo__TitleIcon,
        TitleLabel: SelfIntroductionHero__PersonalInfo__TitleLabel,
        Gap: SelfIntroductionHero__PersonalInfo__Gap,
        Content: SelfIntroductionHero__PersonalInfo__Content
    };
};

const SelfIntroductionHero__DownloadButton__Button__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const downloadButtonContext = DownloadButtonContextHook.useDownloadButtonContext();

    const ifViewportSizeIsGreaterThanOrEqualToSmallBreakpoint = useScreenSize(ScreenSize.Small);

    const inheritedStyle = DownloadButtonVariant.Default(downloadButtonContext.props)(buttonContext.props)
        .Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        display: "none",
        minWidth: 150,
        marginTop: -5,
        ...ifViewportSizeIsGreaterThanOrEqualToSmallBreakpoint && {
            display: "flex"
        }
    };
};

const SelfIntroductionHero__DownloadButton__Button__Label: LabelStyle = function (labelProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const downloadButtonContext = DownloadButtonContextHook.useDownloadButtonContext();

    const inheritedStyle = DownloadButtonVariant.Default(downloadButtonContext.props)(buttonContext.props).Label(labelProps);

    return {
        ...inheritedStyle,
        fontWeight: "bold"
    };
};

const SelfIntroductionHero__DownloadButton: DownloadButtonStyle = function (downloadButtonProps)
{
    return function (buttonProps)
    {
        return {
            ...DownloadButtonVariant.Default(downloadButtonProps)(buttonProps),
            Root: SelfIntroductionHero__DownloadButton__Button__Root,
            Label: SelfIntroductionHero__DownloadButton__Button__Label
        };
    };
};

export const Default: SelfIntroductionHeroStyle = function ()
{
    return {
        Root: SelfIntroductionHero__Root,
        CoverPhoto: SelfIntroductionHero__CoverPhoto,
        Banner: SelfIntroductionHero__Banner,
        AvatarContainer: SelfIntroductionHero__AvatarContainer,
        Avatar: SelfIntroductionHero__Avatar,
        Name: SelfIntroductionHero__Name,
        AlternativeName: SelfIntroductionHero__AlternativeName,
        Description: SelfIntroductionHero__Description,
        PersonalInfo: SelfIntroductionHero__PersonalInfo,
        DownloadButton: SelfIntroductionHero__DownloadButton
    };
};
