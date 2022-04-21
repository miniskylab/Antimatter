import {Props as RangeSliderProps, Variant} from "@miniskylab/antimatter-range-slider";
import {SerializedProps} from "@miniskylab/deserializer-model";

export type Props = SerializedProps<RangeSliderProps, {
    readonly variant?: keyof typeof Variant;
}>;
