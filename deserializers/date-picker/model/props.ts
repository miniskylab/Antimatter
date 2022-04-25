import {Props as DatePickerProps, Variant} from "@miniskylab/antimatter-date-picker";
import {SerializedProps} from "@miniskylab/antimatter-deserializer-model";

export type Props = SerializedProps<DatePickerProps, {
    readonly variant?: keyof typeof Variant;
    readonly defaultSelectedDate?: string;
}>;
