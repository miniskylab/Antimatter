import {Props as DonutChartProps, Variant} from "@miniskylab/antimatter-donut-chart";
import {DeserializerCreator} from "@miniskylab/deserializer-model";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "../circular-slider/models/props";

export class DonutChartDeserializerCreator extends DeserializerCreator<SerializedProps>
{
    protected get PropsType(): ClassConstructor<DonutChartProps>
    {
        return DonutChartProps;
    }

    protected deserialize(serializedProps: SerializedProps): DonutChartProps
    {
        return {
            ...serializedProps,
            variant: Variant[serializedProps.variant]
        };
    }
}
