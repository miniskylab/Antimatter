import {ComponentName, Decorator} from "@miniskylab/antimatter/infrastructure";
import {LabelComponent} from "./label-component";
import {LabelComponentProps} from "./models/label-component-props";
import {LabelExporter} from "./models/label-exporter";

export const LabelComponentName = Decorator.getValue<string>(ComponentName, LabelComponentProps);

export {LabelComponent};
export {LabelComponentProps};

export {LabelVariant} from "./variants";
export type {LabelExportProps as LabelProps} from "./models/label-export-props";
export const Label = new LabelExporter().export(LabelComponent);
