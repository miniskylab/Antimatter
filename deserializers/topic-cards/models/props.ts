import {Props as TopicCardsProps, Variant} from "@miniskylab/antimatter-topic-cards";
import {SerializedProps} from "@miniskylab/deserializer-model";

export type Props = SerializedProps<TopicCardsProps, {
    readonly variant?: keyof typeof Variant;
}>;
