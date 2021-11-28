import {ComponentName} from "@miniskylab/antimatter-component";
import {Decorator} from "@miniskylab/antimatter-decorator";
import {RecordComponentProps} from "./models/record-component-props";
import {RecordExporter} from "./models/record-exporter";
import {RecordComponent} from "./record-component";

export const RecordComponentName = Decorator.getValue<string>(ComponentName, RecordComponentProps);

export {RecordComponent};
export {RecordComponentProps};

export {RecordVariant} from "./variants";
export type {RecordExportProps as RecordProps} from "./models/record-export-props";
export const Record = new RecordExporter().export(RecordComponent);
