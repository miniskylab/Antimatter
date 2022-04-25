import {SerializedProps} from "@miniskylab/antimatter-deserializer-model";
import {Props as PipsProps, Shape, Variant} from "@miniskylab/antimatter-pips";

export type Props = SerializedProps<PipsProps, {
    readonly variant?: keyof typeof Variant;
    readonly shape?: keyof typeof Shape;
}>;
