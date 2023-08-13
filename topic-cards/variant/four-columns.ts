import {ScreenSize, useScreenSize} from "@miniskylab/antimatter-framework";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Card} from "../component";
import {TopicCardsContextHook} from "../hook";
import {TopicCardsStyle} from "../model";
import {ThreeColumns} from "./three-columns";

const TopicCards__Root: ViewStyle = function (viewProps)
{
    const topicCardsContext = TopicCardsContextHook.useTopicCardsContext();

    const ifViewportSizeIsGreaterThanOrEqualToExtraLargeBreakpoint = useScreenSize(ScreenSize.ExtraLarge);

    const inheritedStyle = ThreeColumns(topicCardsContext.props).Root(viewProps);

    return {
        ...inheritedStyle,
        ...ifViewportSizeIsGreaterThanOrEqualToExtraLargeBreakpoint && {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            justifyContent: "flex-start"
        }
    };
};

const TopicCards__Card__Root: ViewStyle = function (viewProps)
{
    const cardContext = Card.ContextHook.useCardContext();
    const topicCardsContext = TopicCardsContextHook.useTopicCardsContext();

    const ifViewportSizeIsGreaterThanOrEqualToExtraLargeBreakpoint = useScreenSize(ScreenSize.ExtraLarge);

    const inheritedStyle = ThreeColumns(topicCardsContext.props)
        .Card(cardContext.props)
        .Root(viewProps);

    return {
        ...inheritedStyle,
        ...ifViewportSizeIsGreaterThanOrEqualToExtraLargeBreakpoint && {
            flexBasis: "25%",
            marginVertical: 0,
            opacity: 1
        }
    };
};

const TopicCards__Card__Content: ViewStyle = function (viewProps)
{
    const cardContext = Card.ContextHook.useCardContext();
    const topicCardsContext = TopicCardsContextHook.useTopicCardsContext();

    const ifViewportSizeIsGreaterThanOrEqualToExtraLargeBreakpoint = useScreenSize(ScreenSize.ExtraLarge);

    const inheritedStyle = ThreeColumns(topicCardsContext.props)
        .Card(cardContext.props)
        .Content(viewProps);

    return {
        ...inheritedStyle,
        ...ifViewportSizeIsGreaterThanOrEqualToExtraLargeBreakpoint && {
            height: "auto"
        }
    };
};

const TopicCards__Card__HorizontalMargin: ViewStyle = function (viewProps)
{
    const cardContext = Card.ContextHook.useCardContext();
    const topicCardsContext = TopicCardsContextHook.useTopicCardsContext();

    const ifViewportSizeIsGreaterThanOrEqualToExtraLargeBreakpoint = useScreenSize(ScreenSize.ExtraLarge);

    const inheritedStyle = ThreeColumns(topicCardsContext.props)
        .Card(cardContext.props)
        .HorizontalMargin(viewProps);

    return {
        ...inheritedStyle,
        ...ifViewportSizeIsGreaterThanOrEqualToExtraLargeBreakpoint && {display: "none"}
    };
};

const TopicCards__Card: Card.Style = function ()
{
    const cardContext = Card.ContextHook.useCardContext();
    const topicCardsContext = TopicCardsContextHook.useTopicCardsContext();

    const inheritedStyle = ThreeColumns(topicCardsContext.props).Card(cardContext.props);

    return {
        ...inheritedStyle,
        Root: TopicCards__Card__Root,
        Content: TopicCards__Card__Content,
        HorizontalMargin: TopicCards__Card__HorizontalMargin
    };
};

export const FourColumns: TopicCardsStyle = function (topicCardsProps)
{
    const inheritedStyle = ThreeColumns(topicCardsProps);

    return {
        ...inheritedStyle,
        Root: TopicCards__Root,
        Card: TopicCards__Card
    };
};
