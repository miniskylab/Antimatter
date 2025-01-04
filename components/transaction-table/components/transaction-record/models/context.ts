import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {type Props} from "./props";

export const TransactionRecordContext = createContext<TransactionRecordContext>(undefined);
export type TransactionRecordContext = ComponentContext<Props>;

export const TagIdContext = createContext<TagIdContext>(undefined);
export type TagIdContext = string | undefined;
