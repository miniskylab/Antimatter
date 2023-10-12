import {ButtonContextHook} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {ScreenSize, ShadowStyle, useResponsiveStyle} from "@miniskylab/antimatter-framework";
import {IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {ImageStyle, ImageVariant} from "@miniskylab/antimatter-image";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";
import {NavButtonContextHook, NavButtonStyle, NavButtonVariant} from "@miniskylab/antimatter-nav-button";
import {PressableStyle} from "@miniskylab/antimatter-pressable";
import {ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {Card} from "../components";
import {TopicCardGroupStyle} from "../models";

const TopicCardGroup__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "stretch",
        minWidth: 300,
        maxWidth: 1000,
        marginVertical: -10,
        ...useResponsiveStyle(ScreenSize.Medium, {
            marginHorizontal: -10
        })
    };
};

const TopicCardGroup__Card__Root: ViewStyle = function (viewProps)
{
    const cardContext = Card.ContextHook.useCardContext();

    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        alignItems: "stretch",
        flexBasis: "100%",
        marginVertical: 10,
        ...useResponsiveStyle(ScreenSize.Medium, {flexBasis: "50%"}),
        ...useResponsiveStyle(ScreenSize.Large, {flexBasis: "33.33%"}),
        ...cardContext.props.thisIsPlaceholderCard && {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            opacity: 0
        }
    };
};

const TopicCardGroup__Card__Content: ViewStyle = function (viewProps)
{
    const cardContext = Card.ContextHook.useCardContext();

    return {
        ...ViewVariant.Default(viewProps),
        flex: 1,
        justifyContent: "flex-start",
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: Color.Background,
        ...cardContext.props.thisIsPlaceholderCard && {
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0
        }
    };
};

const TopicCardGroup__Card__HorizontalMargin: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        width: 10,
        display: "none",
        ...useResponsiveStyle(ScreenSize.Medium, {
            display: "flex"
        })
    };
};

const TopicCardGroup__Card__Icon: IconStyle = function (iconProps)
{
    return {
        ...IconVariant.Default(iconProps),
        height: 150,
        fontSize: 150,
        color: Color.White
    };
};

const TopicCardGroup__Card__Image: ImageStyle = function (imageProps)
{
    return {
        ...ImageVariant.Default(imageProps),
        width: "100%",
        height: 150,
        resizeMode: "contain"
    };
};

const TopicCardGroup__Card__Title: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        width: "100%",
        marginTop: 30,
        color: Color.White,
        fontSize: 32,
        fontWeight: "bold"
    };
};

const TopicCardGroup__Card__Description: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        lineHeight: 28,
        marginTop: 20,
        color: Color.Neutral,
        fontSize: 16,
        textAlign: "justify"
    };
};

const TopicCardGroup__Card__CtaContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        width: "100%",
        marginTop: 15,
        marginBottom: 5
    };
};

const TopicCardGroup__Card__Cta__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const navButtonContext = NavButtonContextHook.useNavButtonContext();

    const inheritedStyle = NavButtonVariant.Default(navButtonContext.props)(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        width: "100%",
        marginTop: 15
    };
};

const TopicCardGroup__Card__Cta: NavButtonStyle = function (navButtonProps)
{
    return function (buttonProps)
    {
        return {
            ...NavButtonVariant.Default(navButtonProps)(buttonProps),
            Root: TopicCardGroup__Card__Cta__Root
        };
    };
};

const TopicCardGroup__Card__Shadow: ShadowStyle = function ()
{
    return {
        shadowOffset: {width: 0, height: -2},
        shadowRadius: 40,
        shadowColor: Color.Black,
        shadowOpacity: 1
    };
};

const TopicCardGroup__Card: Card.Style = function ()
{
    return {
        Root: TopicCardGroup__Card__Root,
        Content: TopicCardGroup__Card__Content,
        HorizontalMargin: TopicCardGroup__Card__HorizontalMargin,
        Icon: TopicCardGroup__Card__Icon,
        Image: TopicCardGroup__Card__Image,
        Title: TopicCardGroup__Card__Title,
        Description: TopicCardGroup__Card__Description,
        CtaContainer: TopicCardGroup__Card__CtaContainer,
        Cta: TopicCardGroup__Card__Cta,
        Shadow: TopicCardGroup__Card__Shadow
    };
};

export const ThreeColumns: TopicCardGroupStyle = function ()
{
    return {
        Root: TopicCardGroup__Root,
        Card: TopicCardGroup__Card
    };
};
