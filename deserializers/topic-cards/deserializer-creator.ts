import {Props as TopicCardsProps, Variant} from "@miniskylab/antimatter-topic-cards";
import {DeserializerCreator} from "@miniskylab/deserializer-model";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./models/props";

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
