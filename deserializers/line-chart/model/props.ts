import {SerializedProps} from "@miniskylab/antimatter-deserializer-model";
import {Props as LineChartProps, Variant} from "@miniskylab/antimatter-line-chart";

export type Props = SerializedProps<LineChartProps, {
    readonly variant?: keyof typeof Variant;
}>;
