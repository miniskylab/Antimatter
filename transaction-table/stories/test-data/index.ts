import {isEqualDate} from "@miniskylab/antimatter-framework";
import {labels} from "./labels";
import {transactions} from "./transactions";

export const TestData = {
    labels,
    transactions,
    getTransactionsByExecutionDate(executionDate: Date): typeof transactions
    {
        const filteredTransactions: typeof transactions = {};
        Object.keys(transactions)
            .filter(transactionId => isEqualDate(transactions[transactionId].executedDate, executionDate))
            .forEach(transactionId => { filteredTransactions[transactionId] = transactions[transactionId]; });

        return filteredTransactions;
    }
};
