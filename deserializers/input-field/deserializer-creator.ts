import {DeserializerCreator} from "@miniskylab/antimatter-deserializer-model";
import {Props as InputFieldProps, Variant} from "@miniskylab/antimatter-input-field";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./model";

export class InputFieldDeserializerCreator extends DeserializerCreator<SerializedProps>
{
    protected get PropsType(): ClassConstructor<InputFieldProps>
    {
        return InputFieldProps;
    }

    protected deserialize(serializedProps: SerializedProps): InputFieldProps
    {
        return {
            ...serializedProps,
            variant: Variant[serializedProps.variant]
        };
    }
}
