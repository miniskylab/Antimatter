import {Styled} from "@miniskylab/antimatter-framework";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Card} from "../component";
import {TopicCardsProps} from "./props";

export type TopicCardsStyle = (topicCardsProps: Styled<TopicCardsProps>) => {
    Root?: ViewStyle;
    Card?: Card.Style;
};
