import {DeserializerCreator} from "@miniskylab/antimatter-deserializer-model";
import {Props as RangeSliderProps, Variant} from "@miniskylab/antimatter-range-slider";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./model";

export class RangeSliderDeserializerCreator extends DeserializerCreator<SerializedProps>
{
    protected get PropsType(): ClassConstructor<RangeSliderProps>
    {
        return RangeSliderProps;
    }

    protected deserialize(serializedProps: SerializedProps): RangeSliderProps
    {
        return {
            ...serializedProps,
            variant: Variant[serializedProps.variant]
        };
    }
}
