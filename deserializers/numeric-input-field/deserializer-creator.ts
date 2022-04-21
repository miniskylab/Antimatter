import {Props as NumericInputFieldProps, Variant} from "@miniskylab/antimatter-numeric-input-field";
import {DeserializerCreator} from "@miniskylab/deserializer-model";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./models/props";

export class NumericInputFieldDeserializerCreator extends DeserializerCreator<SerializedProps>
{
    protected get PropsType(): ClassConstructor<NumericInputFieldProps>
    {
        return NumericInputFieldProps;
    }

    protected deserialize(serializedProps: SerializedProps): NumericInputFieldProps
    {
        return {
            ...serializedProps,
            variant: Variant[serializedProps.variant]
        };
    }
}
