import {Props as CircularSliderProps, Variant} from "@miniskylab/antimatter-circular-slider";
import {DeserializerCreator} from "@miniskylab/antimatter-deserializer-model";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./model";

export class CircularSliderDeserializerCreator extends DeserializerCreator<SerializedProps>
{
    protected get PropsType(): ClassConstructor<CircularSliderProps>
    {
        return CircularSliderProps;
    }

    protected deserialize(serializedProps: SerializedProps): CircularSliderProps
    {
        return {
            ...serializedProps,
            variant: Variant[serializedProps.variant]
        };
    }
}
