import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";

export const TransactionRecordContext = createContext<TransactionRecordContext>({});
export type TransactionRecordContext = ComponentContext<Props>;
