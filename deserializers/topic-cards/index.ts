import {TopicCards as TopicCardsComponent} from "@miniskylab/antimatter-topic-cards";
import {TopicCardsDeserializerCreator} from "./deserializer-creator";

export const TopicCards = new TopicCardsDeserializerCreator().createFrom(TopicCardsComponent);
export {Props} from "./model";
