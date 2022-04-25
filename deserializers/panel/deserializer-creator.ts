import {DeserializerCreator} from "@miniskylab/antimatter-deserializer-model";
import {Props as PanelProps, Variant} from "@miniskylab/antimatter-panel";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./model";

export class PanelDeserializerCreator extends DeserializerCreator<SerializedProps>
{
    protected get PropsType(): ClassConstructor<PanelProps>
    {
        return PanelProps;
    }

    protected deserialize(serializedProps: SerializedProps): PanelProps
    {
        return {
            ...serializedProps,
            variant: Variant[serializedProps.variant]
        };
    }
}
