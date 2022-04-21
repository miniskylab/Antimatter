import {Props as PipsProps, Shape, Variant} from "@miniskylab/antimatter-pips";
import {SerializedProps} from "@miniskylab/deserializer-model";

export type Props = SerializedProps<PipsProps, {
    readonly variant?: keyof typeof Variant;
    readonly shape?: Shape[keyof Shape];
}>;
