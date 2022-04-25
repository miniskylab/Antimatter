import {SerializedProps} from "@miniskylab/antimatter-deserializer-model";
import {Props as TopicCardsProps, Variant} from "@miniskylab/antimatter-topic-cards";

export type Props = SerializedProps<TopicCardsProps, {
    readonly variant?: keyof typeof Variant;
}>;
