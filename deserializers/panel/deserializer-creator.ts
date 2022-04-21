import {Props as PanelProps, Variant} from "@miniskylab/antimatter-panel";
import {DeserializerCreator} from "@miniskylab/deserializer-model";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./models/props";

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
