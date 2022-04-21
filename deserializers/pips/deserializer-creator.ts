import {Props as PipsProps, Shape, Variant} from "@miniskylab/antimatter-pips";
import {Enum} from "@miniskylab/antimatter-typescript";
import {DeserializerCreator} from "@miniskylab/deserializer-model";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./models/props";

export class PipsDeserializerCreator extends DeserializerCreator<SerializedProps>
{
    protected get PropsType(): ClassConstructor<PipsProps>
    {
        return PipsProps;
    }

    protected deserialize(serializedProps: SerializedProps): PipsProps
    {
        return {
            ...serializedProps,
            variant: Variant[serializedProps.variant],
            shape: Enum.getValue(Shape, serializedProps.shape)
        };
    }
}
