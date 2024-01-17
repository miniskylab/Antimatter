import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";

export const TransactionRecordContext = createContext<TransactionRecordContext>(undefined);
export type TransactionRecordContext = ComponentContext<Props>;

export const TagMetadataContext = createContext<TagMetadataContext>(undefined);
export type TagMetadataContext = string;
