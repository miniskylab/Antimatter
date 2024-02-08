import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";
import {Ref} from "./ref";

export const TransactionRecordContext = createContext<TransactionRecordContext>(undefined);
export type TransactionRecordContext = ComponentContext<Props, undefined, Ref>;

export const TagMetadataContext = createContext<TagMetadataContext>(undefined);
export type TagMetadataContext = string | undefined;
