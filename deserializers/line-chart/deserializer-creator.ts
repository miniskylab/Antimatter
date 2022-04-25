import {DeserializerCreator} from "@miniskylab/antimatter-deserializer-model";
import {Props as LineChartProps, Variant} from "@miniskylab/antimatter-line-chart";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./model";

export class LineChartDeserializerCreator extends DeserializerCreator<SerializedProps>
{
    protected get PropsType(): ClassConstructor<LineChartProps>
    {
        return LineChartProps;
    }

    protected deserialize(serializedProps: SerializedProps): LineChartProps
    {
        return {
            ...serializedProps,
            variant: Variant[serializedProps.variant]
        };
    }
}
