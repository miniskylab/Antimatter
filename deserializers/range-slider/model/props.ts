import {SerializedProps} from "@miniskylab/antimatter-deserializer-model";
import {Props as RangeSliderProps, Variant} from "@miniskylab/antimatter-range-slider";

export type Props = SerializedProps<RangeSliderProps, {
    readonly variant?: keyof typeof Variant;
}>;
