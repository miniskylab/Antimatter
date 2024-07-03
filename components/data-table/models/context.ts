import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {DataTableProps} from "./props";

export const DataTableContext = createContext<DataTableContext>(undefined);
export type DataTableContext = ComponentContext<DataTableProps>;
