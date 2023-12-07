import {Ts} from "@miniskylab/antimatter-framework";
import {TransactionRecord} from "../components";
import {TransactionTableProps} from "../models";

export function isHighlightedTransaction(transaction: TransactionRecord.Data): boolean
{
    return Object.values(transaction.tags)
        .some(
            tag => tag.status === TransactionRecord.TagStatus.Selected &&
                   tag.metadata?.has(TransactionRecord.TagMetadata.HighlightTarget)
        );
}

export function getSummaryFigures(
    transactions: TransactionTableProps["transactions"],
    transactionGroup1Filter: (transaction: TransactionRecord.Data) => boolean,
    transactionGroup2Filter: (transaction: TransactionRecord.Data) => boolean,
    selectedDate: TransactionTableProps["selectedDate"],
    selectedTransaction?: TransactionTableProps["selectedTransaction"]
): Pick<TransactionTableProps["summary"], "section1Value" | "section2Value" | "progressBarValue">
{
    const selectedMonthTransactions = filterTransactionsForSelectedMonth(transactions, selectedDate);
    mergeData(selectedMonthTransactions, selectedTransaction);

    const transactionGroup1: TransactionTableProps["transactions"] = {};
    Object.keys(selectedMonthTransactions)
        .filter(txnId => transactionGroup1Filter(selectedMonthTransactions[txnId]))
        .forEach(txnId => { transactionGroup1[txnId] = selectedMonthTransactions[txnId]; });

    const transactionGroup2: TransactionTableProps["transactions"] = {};
    Object.keys(selectedMonthTransactions)
        .filter(txnId => transactionGroup2Filter(selectedMonthTransactions[txnId]))
        .forEach(txnId => { transactionGroup2[txnId] = selectedMonthTransactions[txnId]; });

    const transactionGroup1TotalAmount = getTotalAmount(transactionGroup1);
    const transactionGroup2TotalAmount = getTotalAmount(transactionGroup2);
    const ratio = transactionGroup1TotalAmount !== 0
        ? Ts.Number.clamp(1 - (transactionGroup2TotalAmount / transactionGroup1TotalAmount), 0, 1)
        : 0;

    return {
        section1Value: transactionGroup1TotalAmount.toLocaleString("en-us"),
        section2Value: transactionGroup2TotalAmount.toLocaleString("en-us"),
        progressBarValue: ratio
    };
}

function filterTransactionsForSelectedMonth(
    transactions: TransactionTableProps["transactions"],
    selectedDate: TransactionTableProps["selectedDate"]
): TransactionTableProps["transactions"]
{
    const filteredTransactions: TransactionTableProps["transactions"] = {};
    Object.keys(transactions)
        .filter(txnId => Ts.Date.isEqualMonth(transactions[txnId].executedDate, selectedDate))
        .forEach(txnId => { filteredTransactions[txnId] = transactions[txnId]; });

    return filteredTransactions;
}

function mergeData(
    transactions: TransactionTableProps["transactions"],
    selectedTransaction: TransactionTableProps["selectedTransaction"]
): void
{
    if (!selectedTransaction)
    {
        return;
    }

    if (selectedTransaction.data)
    {
        transactions[selectedTransaction.id] = selectedTransaction.data;
    }
    else
    {
        delete transactions[selectedTransaction.id];
    }
}

function getTotalAmount(transactions: TransactionTableProps["transactions"]): number
{
    let totalAmount = 0;
    Object.values(transactions).forEach(x => { totalAmount += x.amount; });

    return totalAmount;
}
