import {SerializedProps} from "@miniskylab/antimatter-deserializer-model";
import {Props as LabelProps, Variant} from "@miniskylab/antimatter-label";

export type Props = SerializedProps<LabelProps, {
    readonly variant?: keyof typeof Variant;
}>;
