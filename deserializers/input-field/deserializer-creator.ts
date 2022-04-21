import {Props as InputFieldProps, Variant} from "@miniskylab/antimatter-input-field";
import {DeserializerCreator} from "@miniskylab/deserializer-model";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./models/props";

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
