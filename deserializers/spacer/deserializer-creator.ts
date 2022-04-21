import {Props as SpacerProps, Variant} from "@miniskylab/antimatter-spacer";
import {DeserializerCreator} from "@miniskylab/deserializer-model";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./models/props";

export class SpacerDeserializerCreator extends DeserializerCreator<SerializedProps>
{
    protected get PropsType(): ClassConstructor<SpacerProps>
    {
        return SpacerProps;
    }

    protected deserialize(serializedProps: SerializedProps): SpacerProps
    {
        return {
            ...serializedProps,
            variant: Variant[serializedProps.variant]
        };
    }
}
