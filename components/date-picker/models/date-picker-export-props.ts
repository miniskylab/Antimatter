import {ComponentExportProps} from "@miniskylab/antimatter-component";
import {DatePickerVariant} from "../variants";
import {DatePickerComponentProps} from "./date-picker-component-props";

export type DatePickerExportProps = ComponentExportProps<DatePickerComponentProps, DatePickerVariant, {
    readonly defaultSelectedDate?: Date | string | number;
}>;
