import {DeserializerCreator} from "@miniskylab/antimatter-deserializer-model";
import {Props as LabelProps, Variant} from "@miniskylab/antimatter-label";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./model";

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
