import {TransactionRecord} from "../components";

export type TransactionTableState = {
    readonly isDatePickerOpened: boolean;
    readonly previousTransactions: Record<string, TransactionRecord.Data>;
    readonly toBeDeletedTransactions: Record<string, TransactionRecord.Data>;
};
