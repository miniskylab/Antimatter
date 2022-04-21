import {Props as InputFieldProps, Variant} from "@miniskylab/antimatter-input-field";
import {SerializedProps} from "@miniskylab/deserializer-model";

export type Props = SerializedProps<InputFieldProps, {
    readonly variant?: keyof typeof Variant;
}>;
