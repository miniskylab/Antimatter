import {TransactionTableProps} from "../../models";
import * as Service from "../../services";
import {Tags} from "./tags";
import {Transactions} from "./transactions";

export const TestData = {
    Tags,
    Transactions,
    getSummaryFigures(
        mode: TransactionTableProps["mode"],
        selectedDate: TransactionTableProps["selectedDate"],
        selectedTransaction?: TransactionTableProps["selectedTransaction"]
    ): ReturnType<typeof Service.getSummaryFigures>
    {
        return Service.getSummaryFigures(
            mode,
            Transactions,
            transactionData => Service.isHighlightedTransaction(transactionData),
            transactionData => !Service.isHighlightedTransaction(transactionData),
            selectedDate,
            selectedTransaction
        );
    }
};
