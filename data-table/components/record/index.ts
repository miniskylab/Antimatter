import {ComponentName, Decorator} from "antimatter/infrastructures";
import {RecordComponentProps} from "./models/record-component-props";
import {RecordExporter} from "./models/record-exporter";
import {RecordComponent} from "./record-component";

export const RecordComponentName = Decorator.getValue(ComponentName, RecordComponentProps) as string;

export {RecordComponent};
export {RecordComponentProps};

export {RecordVariant} from "./variants";
export type {RecordExportProps as RecordProps} from "./models/record-export-props";
export const Record = new RecordExporter().export(RecordComponent);
