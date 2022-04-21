import {Props as TransitionProps, Variant} from "@miniskylab/antimatter-transition";
import {DeserializerCreator} from "@miniskylab/deserializer-model";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./models/props";

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
