import {TransactionTableProps} from "../../models";
import * as Service from "../../services";
import {tags} from "./tags";
import {transactions} from "./transactions";

export const TestData = {
    tags,
    transactions,
    getSummaryFigures(
        mode: TransactionTableProps["mode"],
        selectedDate: TransactionTableProps["selectedDate"],
        selectedTransaction?: TransactionTableProps["selectedTransaction"]
    ): ReturnType<typeof Service.getSummaryFigures>
    {
        return Service.getSummaryFigures(
            mode,
            transactions,
            transactionData => Service.isHighlightedTransaction(transactionData),
            transactionData => !Service.isHighlightedTransaction(transactionData),
            selectedDate,
            selectedTransaction
        );
    }
};
