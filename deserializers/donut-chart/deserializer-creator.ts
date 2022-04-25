import {DeserializerCreator} from "@miniskylab/antimatter-deserializer-model";
import {Props as DonutChartProps, Variant} from "@miniskylab/antimatter-donut-chart";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./model";

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
