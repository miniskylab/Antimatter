import {DeserializerCreator} from "@miniskylab/antimatter-deserializer-model";
import {Props as TopicCardsProps, Variant} from "@miniskylab/antimatter-topic-cards";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./model";

export class TopicCardsDeserializerCreator extends DeserializerCreator<SerializedProps>
{
    protected get PropsType(): ClassConstructor<TopicCardsProps>
    {
        return TopicCardsProps;
    }

    protected deserialize(serializedProps: SerializedProps): TopicCardsProps
    {
        return {
            ...serializedProps,
            variant: Variant[serializedProps.variant]
        };
    }
}
