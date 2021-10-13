import {ComponentName, Decorator} from "@miniskylab/antimatter/infrastructure";
import {InputFieldComponent} from "./input-field-component";
import {InputFieldComponentProps} from "./models/input-field-component-props";
import {InputFieldExporter} from "./models/input-field-exporter";

export const InputFieldComponentName = Decorator.getValue(ComponentName, InputFieldComponentProps) as string;

export {InputFieldComponent};
export {InputFieldComponentProps};

export {InputFieldVariant} from "./variants";
export type {InputFieldExportProps as InputFieldProps} from "./models/input-field-export-props";
export const InputField = new InputFieldExporter().export(InputFieldComponent);
