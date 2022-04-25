import {DeserializerCreator} from "@miniskylab/antimatter-deserializer-model";
import {Props as SpacerProps, Variant} from "@miniskylab/antimatter-spacer";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./model";

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
