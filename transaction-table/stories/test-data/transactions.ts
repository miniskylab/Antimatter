import {TransactionRecord, TransactionTableProps} from "@miniskylab/antimatter-transaction-table";
import {labels} from "./labels";

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

export const transactions: TransactionTableProps["transactions"] = {
    "1": {
        name: "Pulvinar",
        labels: deepCopyWithSelection(labels, "dolore", "tortor"),
        amount: 1280000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "2": {
        name: "Pretium",
        labels: deepCopyWithSelection(labels, "dolore", "tortor"),
        amount: 327000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "3": {
        name: "Turpis massa tincidunt",
        labels: deepCopyWithSelection(labels, "semper"),
        amount: 10000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "4": {
        name: "Nulla pharetra",
        labels: deepCopyWithSelection(labels, "interdum"),
        amount: 180000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "5": {
        name: "Pellentesque",
        labels: deepCopyWithSelection(labels, "feugiat"),
        amount: 150000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "6": {
        name: "Risus",
        labels: deepCopyWithSelection(labels, "mauris"),
        amount: 30000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "7": {
        name: "Diam donec",
        labels: deepCopyWithSelection(labels, "dolore", "feugiat"),
        amount: 390000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "8": {
        name: "Quam",
        labels: deepCopyWithSelection(labels, "volutpat"),
        amount: 10000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "9": {
        name: "Urna molestie",
        labels: deepCopyWithSelection(labels, "iaculis", "sagittis"),
        amount: 1000000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "10": {
        name: "Iaculis eu non",
        labels: deepCopyWithSelection(labels, "viverra", "metus"),
        amount: 10520000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "11": {
        name: "Phasellus vestibulum",
        labels: deepCopyWithSelection(labels, "imperdiet"),
        amount: 10520000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "12": {
        name: "Nisi lacus sed",
        labels: deepCopyWithSelection(labels, "massa"),
        amount: 10520000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "13": {
        name: "Risus ultricies",
        labels: deepCopyWithSelection(labels, "adipiscing"),
        amount: 10520000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "14": {
        name: "Cursus turpis",
        labels: deepCopyWithSelection(labels, "dolore", "tortor"),
        amount: 45000,
        executedDate: yesterday,
        modifiedDate: yesterday,
        createdDate: yesterday
    },
    "15": {
        name: "Morbi tincidunt",
        labels: deepCopyWithSelection(labels, "dolore", "tortor"),
        amount: 70000,
        executedDate: yesterday,
        modifiedDate: yesterday,
        createdDate: yesterday
    }
};

function deepCopyWithSelection(labels: TransactionRecord.Props["labels"], ...selections: string[]): TransactionRecord.Props["labels"]
{
    const copy = {...labels};
    selections.forEach(selection =>
    {
        copy[selection] = {
            ...copy[selection],
            status: TransactionRecord.TransactionLabelStatus.Selected
        };
    });

    return copy;
}
