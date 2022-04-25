import {DeserializerCreator} from "@miniskylab/antimatter-deserializer-model";
import {Props as PipsProps, Shape, Variant} from "@miniskylab/antimatter-pips";
import {Enum} from "@miniskylab/antimatter-typescript";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./model";

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
