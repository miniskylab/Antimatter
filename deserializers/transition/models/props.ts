import {Props as TransitionProps, Variant} from "@miniskylab/antimatter-transition";
import {SerializedProps} from "@miniskylab/deserializer-model";

export type Props = SerializedProps<TransitionProps, {
    readonly variant?: keyof typeof Variant;
}>;
