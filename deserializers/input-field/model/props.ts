import {SerializedProps} from "@miniskylab/antimatter-deserializer-model";
import {Props as InputFieldProps, Variant} from "@miniskylab/antimatter-input-field";

export type Props = SerializedProps<InputFieldProps, {
    readonly variant?: keyof typeof Variant;
}>;
