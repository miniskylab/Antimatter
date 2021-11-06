import {ComponentName, Decorator} from "@miniskylab/antimatter/infrastructure";
import {DatePickerComponent} from "./date-picker-component";
import {DatePickerComponentProps} from "./models/date-picker-component-props";
import {DatePickerExporter} from "./models/date-picker-exporter";

export const DatePickerComponentName = Decorator.getValue<string>(ComponentName, DatePickerComponentProps);

export {DatePickerComponent};
export {DatePickerComponentProps};

export {DatePickerVariant} from "./variants";
export type {DatePickerExportProps as DatePickerProps} from "./models/date-picker-export-props";
export const DatePicker = new DatePickerExporter().export(DatePickerComponent);
