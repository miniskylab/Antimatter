import {SerializedProps} from "@miniskylab/antimatter-deserializer-model";
import {Props as DonutChartProps, Variant} from "@miniskylab/antimatter-donut-chart";

export type Props = SerializedProps<DonutChartProps, {
    readonly variant?: keyof typeof Variant;
}>;
