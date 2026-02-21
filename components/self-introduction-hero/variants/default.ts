import {ButtonContextHook} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {DownloadButtonContextHook, type DownloadButtonStyle, DownloadButtonVariant} from "@miniskylab/antimatter-download-button";
import {getScreenSizeFromBreakpoint, useResponsiveStyle} from "@miniskylab/antimatter-framework";
import {type ImageStyle, ImageVariant} from "@miniskylab/antimatter-image";
import {type PressableStyle} from "@miniskylab/antimatter-pressable";
import {type TextStyle, TextVariant} from "@miniskylab/antimatter-text";
import {type ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {type SelfIntroductionHeroStyle} from "../models";

const SelfIntroductionHero__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        flexBasis: getScreenSizeFromBreakpoint("ExtraLarge"),
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

const SelfIntroductionHero__Name: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        alignSelf: "stretch",
        height: 50,
        marginTop: 45,
        fontSize: 40,
        fontWeight: "bold",
        color: Color.White,
        textAlign: "center",
        ...useResponsiveStyle("Small", {
            height: 60,
            fontSize: 50
        })
    };
};

const SelfIntroductionHero__AlternativeName: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        alignSelf: "stretch",
        height: 40,
        fontSize: 28,
        fontWeight: "bold",
        color: Color.White,
        textAlign: "center",
        ...useResponsiveStyle("Small", {
            height: 50,
            fontSize: 38
        })
    };
};

const SelfIntroductionHero__Description: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        width: "100%",
        lineHeight: 30,
        paddingVertical: 20,
        paddingHorizontal: 15,
        fontSize: 20,
        color: Color.Neutral,
        textAlign: "justify",
        ...useResponsiveStyle("Small", {
            width: 580,
            paddingVertical: 30,
            paddingHorizontal: 20
        }),
        ...useResponsiveStyle("Medium", {
            width: 740
        })
    };
};

const SelfIntroductionHero__SimpleInfoSection1: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        alignSelf: "stretch",
        paddingTop: 6,
        paddingBottom: 10,
        paddingHorizontal: 20,
        borderWidth: 3,
        borderColor: Color.Gray,
        marginTop: 10,
        marginHorizontal: 15,
        backgroundColor: Color.Gray__a10,
        ...useResponsiveStyle("Small", {
            alignItems: "flex-start",
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
            marginLeft: -370,
            borderWidth: 0,
            backgroundColor: Color.Transparent
        }),
        ...useResponsiveStyle("Medium", {
            width: 200,
            marginLeft: -500
        })
    };
};

const SelfIntroductionHero__SimpleInfoSection1Container: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps)
    };
};

const SelfIntroductionHero__SimpleInfoSection1Label: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        lineHeight: 30,
        fontSize: 16,
        fontWeight: "bold",
        color: Color.Neutral,
        ...useResponsiveStyle("Small", {
            lineHeight: 37,
            fontSize: 17
        }),
        ...useResponsiveStyle("Medium", {
            fontSize: 20
        })
    };
};

const SelfIntroductionHero__SimpleInfoSection1Value: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        fontSize: 20,
        fontWeight: "bold",
        ...useResponsiveStyle("Small", {
            height: 33,
            fontSize: 17,
            justifyContent: "flex-start",
            borderStyle: "solid",
            borderBottomWidth: 4,
            borderBottomColor: Color.Blue
        }),
        ...useResponsiveStyle("Medium", {
            fontSize: 20,
            lineHeight: 21
        })
    };
};

const SelfIntroductionHero__SimpleInfoSection2: ViewStyle = function (viewProps)
{
    return {
        ...SelfIntroductionHero__SimpleInfoSection1(viewProps),
        borderColor: Color.Blue,
        backgroundColor: Color.Blue__a10,
        ...useResponsiveStyle("Small", {
            alignItems: "flex-end",
            marginLeft: 370,
            backgroundColor: Color.Transparent
        }),
        ...useResponsiveStyle("Medium", {
            marginLeft: 500
        })
    };
};

const SelfIntroductionHero__SimpleInfoSection2Container: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps)
    };
};

const SelfIntroductionHero__SimpleInfoSection2Label: TextStyle = function (textProps)
{
    return {
        ...SelfIntroductionHero__SimpleInfoSection1Label(textProps)
    };
};

const SelfIntroductionHero__SimpleInfoSection2Value: TextStyle = function (textProps)
{
    return {
        ...SelfIntroductionHero__SimpleInfoSection1Value(textProps)
    };
};

const SelfIntroductionHero__DownloadButton__Button__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const downloadButtonContext = DownloadButtonContextHook.useDownloadButtonContext();

    const inheritedStyle = DownloadButtonVariant.Default(downloadButtonContext.props, downloadButtonContext.state)(buttonContext.props)
        .Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        display: "none",
        minWidth: 150,
        marginTop: -5,
        ...useResponsiveStyle("Small", {
            display: "flex"
        })
    };
};

const SelfIntroductionHero__DownloadButton__Button__Label: TextStyle = function (textProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const downloadButtonContext = DownloadButtonContextHook.useDownloadButtonContext();

    const inheritedStyle = DownloadButtonVariant.Default(downloadButtonContext.props, downloadButtonContext.state)(buttonContext.props)
        .Label(textProps);

    return {
        ...inheritedStyle,
        fontWeight: "bold"
    };
};

const SelfIntroductionHero__DownloadButton: DownloadButtonStyle = function (downloadButtonProps, downloadButtonState)
{
    return function (buttonProps)
    {
        return {
            ...DownloadButtonVariant.Default(downloadButtonProps, downloadButtonState)(buttonProps),
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
        SimpleInfoSection1: SelfIntroductionHero__SimpleInfoSection1,
        SimpleInfoSection1Container: SelfIntroductionHero__SimpleInfoSection1Container,
        SimpleInfoSection1Label: SelfIntroductionHero__SimpleInfoSection1Label,
        SimpleInfoSection1Value: SelfIntroductionHero__SimpleInfoSection1Value,
        SimpleInfoSection2: SelfIntroductionHero__SimpleInfoSection2,
        SimpleInfoSection2Container: SelfIntroductionHero__SimpleInfoSection2Container,
        SimpleInfoSection2Label: SelfIntroductionHero__SimpleInfoSection2Label,
        SimpleInfoSection2Value: SelfIntroductionHero__SimpleInfoSection2Value,
        DownloadButton: SelfIntroductionHero__DownloadButton
    };
};
