import {DeserializerCreator} from "@miniskylab/antimatter-deserializer-model";
import {Props as TransitionProps, Variant} from "@miniskylab/antimatter-transition";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./model";

export class TransitionDeserializerCreator extends DeserializerCreator<SerializedProps>
{
    protected get PropsType(): ClassConstructor<TransitionProps>
    {
        return TransitionProps;
    }

    protected deserialize(serializedProps: SerializedProps): TransitionProps
    {
        return {
            ...serializedProps,
            variant: Variant[serializedProps.variant]
        };
    }
}
