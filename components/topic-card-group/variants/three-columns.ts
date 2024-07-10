import {ButtonContextHook} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {useResponsiveStyle} from "@miniskylab/antimatter-framework";
import {NavButtonContextHook, type NavButtonStyle, NavButtonVariant} from "@miniskylab/antimatter-nav-button";
import {type PressableStyle} from "@miniskylab/antimatter-pressable";
import {type TextStyle, TextVariant} from "@miniskylab/antimatter-text";
import {type ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {Card} from "../components";
import {type TopicCardGroupStyle} from "../models";

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
        filter: `drop-shadow(0 -2px 20px ${Color.Black})`,
        ...useResponsiveStyle("Medium", {
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
        maxWidth: 540,
        marginVertical: 10,
        ...useResponsiveStyle("Medium", {flexBasis: "50%"}),
        ...useResponsiveStyle("Large", {flexBasis: "33.33%"}),
        ...cardContext.props.isPlaceholderCard && {
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
        ...cardContext.props.isPlaceholderCard && {
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
        ...useResponsiveStyle("Medium", {
            display: "flex"
        })
    };
};

const TopicCardGroup__Card__Text: TextStyle = function (textProps)
{
    return {
        ...TextVariant.Default(textProps),
        lineHeight: 28,
        fontSize: 16,
        color: Color.Neutral
    };
};

const TopicCardGroup__Card__CtaContainer: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        width: "100%",
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

const TopicCardGroup__Card: Card.Style = function ()
{
    return {
        Root: TopicCardGroup__Card__Root,
        Content: TopicCardGroup__Card__Content,
        HorizontalMargin: TopicCardGroup__Card__HorizontalMargin,
        Text: TopicCardGroup__Card__Text,
        CtaContainer: TopicCardGroup__Card__CtaContainer,
        Cta: TopicCardGroup__Card__Cta
    };
};

export const ThreeColumns: TopicCardGroupStyle = function ()
{
    return {
        Root: TopicCardGroup__Root,
        Card: TopicCardGroup__Card
    };
};
