import {Export} from "@miniskylab/antimatter/infrastructure";
import {DatePickerVariant} from "../variants";
import {DatePickerComponentProps} from "./date-picker-component-props";

export type DatePickerExportProps = Export<DatePickerComponentProps, DatePickerVariant, {
    readonly defaultSelectedDate?: Date | string | number;
}>;
