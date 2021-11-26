import {ComponentName, Decorator} from "@miniskylab/antimatter/infrastructure";
import {DataTableComponent} from "./data-table-component";
import {DataTableComponentProps} from "./models/data-table-component-props";
import {DataTableExporter} from "./models/data-table-exporter";

export const DataTableComponentName = Decorator.getValue<string>(ComponentName, DataTableComponentProps);

export {DataTableComponent};
export {DataTableComponentProps};

export {DataTableVariant} from "./variants";
export type {DataTableExportProps as DataTableProps} from "./models/data-table-export-props";
export const DataTable = new DataTableExporter().export(DataTableComponent);

export {RecordProps} from "./components/record";
