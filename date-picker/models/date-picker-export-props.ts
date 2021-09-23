import {Export} from "@miniskylab/antimatter/infrastructures";
import {DatePickerVariant} from "../variants";
import {DatePickerComponentProps} from "./date-picker-component-props";

export type DatePickerExportProps = Export<DatePickerComponentProps, DatePickerVariant, {
    readonly defaultSelectedDate?: Date | string | number;
}>;
