import {DataTable as DataTableComponent} from "@miniskylab/antimatter-data-table";
import {DataTableDeserializerCreator} from "./deserializer-creator";

export const DataTable = new DataTableDeserializerCreator().createFrom(DataTableComponent);
