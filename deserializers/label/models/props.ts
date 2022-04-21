import {Props as LabelProps, Variant} from "@miniskylab/antimatter-label";
import {SerializedProps} from "@miniskylab/deserializer-model";

export type Props = SerializedProps<LabelProps, {
    readonly variant?: keyof typeof Variant;
}>;
