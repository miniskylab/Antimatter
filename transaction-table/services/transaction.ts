import {Ts} from "@miniskylab/antimatter-framework";
import {TransactionRecord} from "../components";
import {TransactionTableProps} from "../models";

function isHighlightedTransaction(transactionData: TransactionRecord.Data): boolean
{
    return Object.values(transactionData.tags)
        .some(
            tag => tag.status === TransactionRecord.TagStatus.Selected &&
                   tag.metadata?.has(TransactionRecord.TagMetadata.HighlightTarget)
        );
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

export function getTotalHighlightedTransactionAmount(
    transactions: TransactionTableProps["transactions"],
    selectedDate: TransactionTableProps["selectedDate"],
    selectedTransaction?: TransactionTableProps["selectedTransaction"]
): number
{
    const filteredTransactions = filterTransactionsForSelectedMonth(transactions, selectedDate);
    mergeData(filteredTransactions, selectedTransaction);

    let totalAmount = 0;
    Object.values(filteredTransactions)
        .filter(isHighlightedTransaction)
        .forEach(x => { totalAmount += x.amount; });

    return totalAmount;
}

export function getTotalNonHighlightedTransactionAmount(
    transactions: TransactionTableProps["transactions"],
    selectedDate: TransactionTableProps["selectedDate"],
    selectedTransaction?: TransactionTableProps["selectedTransaction"]
): number
{
    const filteredTransactions = filterTransactionsForSelectedMonth(transactions, selectedDate);
    mergeData(filteredTransactions, selectedTransaction);

    let totalAmount = 0;
    Object.values(filteredTransactions)
        .filter(x => !isHighlightedTransaction(x))
        .forEach(x => { totalAmount += x.amount; });

    return totalAmount;
}

export function getTotalHighlightedNonHighlightedAmountRatio(
    transactions: TransactionTableProps["transactions"],
    selectedDate: TransactionTableProps["selectedDate"],
    selectedTransaction?: TransactionTableProps["selectedTransaction"]
): number
{
    const totalHighlightedAmount = getTotalHighlightedTransactionAmount(transactions, selectedDate, selectedTransaction);
    const totalNonHighlightedAmount = getTotalNonHighlightedTransactionAmount(transactions, selectedDate, selectedTransaction);

    if (totalHighlightedAmount === 0)
    {
        return 0;
    }

    return Ts.Number.clamp(1 - (totalNonHighlightedAmount / totalHighlightedAmount), 0, 1);
}

export function getDefaultSummaryFigures(
    transactions: TransactionTableProps["transactions"],
    selectedDate: TransactionTableProps["selectedDate"],
    selectedTransaction?: TransactionTableProps["selectedTransaction"]
): Pick<TransactionTableProps["summary"], "section1Amount" | "section2Amount" | "progressBarValue">
{
    return {
        section1Amount: getTotalHighlightedTransactionAmount(transactions, selectedDate, selectedTransaction),
        section2Amount: getTotalNonHighlightedTransactionAmount(transactions, selectedDate, selectedTransaction),
        progressBarValue: getTotalHighlightedNonHighlightedAmountRatio(transactions, selectedDate, selectedTransaction)
    };
}
