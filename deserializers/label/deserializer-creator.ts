import {Props as LabelProps, Variant} from "@miniskylab/antimatter-label";
import {DeserializerCreator} from "@miniskylab/deserializer-model";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./models/props";

export class LabelDeserializerCreator extends DeserializerCreator<SerializedProps>
{
    protected get PropsType(): ClassConstructor<LabelProps>
    {
        return LabelProps;
    }

    protected deserialize(serializedProps: SerializedProps): LabelProps
    {
        return {
            ...serializedProps,
            variant: Variant[serializedProps.variant]
        };
    }
}
