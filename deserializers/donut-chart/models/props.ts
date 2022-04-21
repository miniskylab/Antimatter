import {Props as DonutChartProps, Variant} from "@miniskylab/antimatter-donut-chart";
import {SerializedProps} from "@miniskylab/deserializer-model";

export type Props = SerializedProps<DonutChartProps, {
    readonly variant?: keyof typeof Variant;
}>;
