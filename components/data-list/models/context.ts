import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {DataListProps} from "./props";

export const DataListContext = createContext<DataListContext>(undefined);
export type DataListContext = ComponentContext<DataListProps>;
