import {SerializedProps} from "@miniskylab/antimatter-deserializer-model";
import {Props as TransitionProps, Variant} from "@miniskylab/antimatter-transition";

export type Props = SerializedProps<TransitionProps, {
    readonly variant?: keyof typeof Variant;
}>;
