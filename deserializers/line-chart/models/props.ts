import {Props as LineChartProps, Variant} from "@miniskylab/antimatter-line-chart";
import {SerializedProps} from "@miniskylab/deserializer-model";

export type Props = SerializedProps<LineChartProps, {
    readonly variant?: keyof typeof Variant;
}>;
