import {Props as NumericInputFieldProps, Variant} from "@miniskylab/antimatter-numeric-input-field";
import {SerializedProps} from "@miniskylab/deserializer-model";

export type Props = SerializedProps<NumericInputFieldProps, {
    readonly variant?: keyof typeof Variant;
}>;
