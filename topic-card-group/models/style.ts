import {Styled} from "@miniskylab/antimatter-framework";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Card} from "../components";
import {TopicCardGroupProps} from "./props";

export type TopicCardGroupStyle = (topicCardGroupProps: Styled<TopicCardGroupProps>) => {
    Root?: ViewStyle;
    Card?: Card.Style;
};
