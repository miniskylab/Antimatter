import {Props as LineChartProps, Variant} from "@miniskylab/antimatter-line-chart";
import {DeserializerCreator} from "@miniskylab/deserializer-model";
import {ClassConstructor} from "class-transformer";
import {Props as SerializedProps} from "./models/props";

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
