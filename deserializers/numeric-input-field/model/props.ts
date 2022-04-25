import {SerializedProps} from "@miniskylab/antimatter-deserializer-model";
import {Props as NumericInputFieldProps, Variant} from "@miniskylab/antimatter-numeric-input-field";

export type Props = SerializedProps<NumericInputFieldProps, {
    readonly variant?: keyof typeof Variant;
}>;
