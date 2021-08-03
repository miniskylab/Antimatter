import {ComponentName, Decorator} from "antimatter/infrastructures";
import {DataTableComponent} from "./data-table-component";
import {DataTableComponentProps} from "./models/data-table-component-props";
import {DataTableExporter} from "./models/data-table-exporter";

export const DataTableComponentName = Decorator.getValue(ComponentName, DataTableComponentProps) as string;

export {DataTableComponent};
export {DataTableComponentProps};

export {DataTableVariant} from "./variants";
export {DataTableRow} from "./models/data-table-row";
export {DataTableAddNewRow} from "./models/data-table-add-new-row";
export type {DataTableExportProps as DataTableProps} from "./models/data-table-export-props";
export const DataTable = new DataTableExporter().export(DataTableComponent);
