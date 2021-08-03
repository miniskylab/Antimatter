import {ComponentName, Decorator} from "antimatter/infrastructures";
import {NumericInputFieldComponentProps} from "./models/numeric-input-field-component-props";
import {NumericInputFieldExporter} from "./models/numeric-input-field-exporter";
import {NumericInputFieldComponent} from "./numeric-input-field-component";

export const NumericInputFieldComponentName = Decorator.getValue(ComponentName, NumericInputFieldComponentProps) as string;

export {NumericInputFieldComponent};
export {NumericInputFieldComponentProps};

export {NumericInputFieldVariant} from "./variants";
export type {NumericInputFieldExportProps as NumericInputFieldProps} from "./models/numeric-input-field-export-props";
export const NumericInputField = new NumericInputFieldExporter().export(NumericInputFieldComponent);
