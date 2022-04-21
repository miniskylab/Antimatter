import {Props as CircularSliderProps, Variant} from "@miniskylab/antimatter-circular-slider";
import {SerializedProps} from "@miniskylab/deserializer-model";

export type Props = SerializedProps<CircularSliderProps, {
    readonly variant?: keyof typeof Variant;
}>;
