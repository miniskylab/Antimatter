import {ComponentProps} from "@miniskylab/antimatter-model";
import {TransactionRecordProps} from "./props";

export type TransactionData = Omit<TransactionRecordProps, keyof ComponentProps | "mode" | "labelSet" | "onClick" | "onChange">;
