import {TransactionRecord} from "../components";

export type TransactionChangeData = Omit<TransactionRecord.Data, "executedDate" | "modifiedDate" | "createdDate">;
