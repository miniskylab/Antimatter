import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Card} from "../components";
import {TopicCardGroupProps} from "./props";

export type TopicCardGroupStyle = (topicCardGroupProps: WithoutStyle<TopicCardGroupProps>) => {
    Root: ViewStyle;
    Card: Card.Style;
};
