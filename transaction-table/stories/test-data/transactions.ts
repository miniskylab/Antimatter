import {TransactionRecord} from "../../components";
import {TransactionTableProps} from "../../models";
import {tags} from "./tags";

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

export const transactions: TransactionTableProps["transactions"] = {
    "1": {
        name: "Pulvinar",
        tags: deepCopyWithSelection(tags, "feugiat", "mauris"),
        amount: 13400000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "2": {
        name: "Pretium",
        tags: deepCopyWithSelection(tags, "dolore", "tortor"),
        amount: 237000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "3": {
        name: "Turpis massa tincidunt",
        tags: deepCopyWithSelection(tags, "semper"),
        amount: 10000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "4": {
        name: "Nulla pharetra",
        tags: deepCopyWithSelection(tags, "interdum"),
        amount: 180000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "5": {
        name: "Pellentesque",
        tags: deepCopyWithSelection(tags, "feugiat"),
        amount: 450000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "6": {
        name: "Risus",
        tags: deepCopyWithSelection(tags, "mauris"),
        amount: 30000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "7": {
        name: "Diam donec",
        tags: deepCopyWithSelection(tags, "dolore", "feugiat"),
        amount: 390000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "8": {
        name: "Quam",
        tags: deepCopyWithSelection(tags, "volutpat"),
        amount: 79000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "9": {
        name: "Urna molestie",
        tags: deepCopyWithSelection(tags, "iaculis"),
        amount: 215000000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "10": {
        name: "Iaculis eu non",
        tags: deepCopyWithSelection(tags, "viverra", "metus"),
        amount: 5000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "11": {
        name: "Phasellus vestibulum",
        tags: deepCopyWithSelection(tags, "imperdiet"),
        amount: 26000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "12": {
        name: "Nisi lacus sed",
        tags: deepCopyWithSelection(tags, "massa"),
        amount: 2560000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "13": {
        name: "Risus ultricies",
        tags: deepCopyWithSelection(tags, "adipiscing"),
        amount: 125000000,
        executedDate: today,
        modifiedDate: today,
        createdDate: today
    },
    "14": {
        name: "Cursus turpis",
        tags: deepCopyWithSelection(tags, "dolore", "tortor"),
        amount: 45000,
        executedDate: yesterday,
        modifiedDate: yesterday,
        createdDate: yesterday
    },
    "15": {
        name: "Morbi tincidunt",
        tags: deepCopyWithSelection(tags, "dolore", "tortor"),
        amount: 70000,
        executedDate: yesterday,
        modifiedDate: yesterday,
        createdDate: yesterday
    }
};

function deepCopyWithSelection(tags: TransactionRecord.Props["tags"], ...selections: string[]): TransactionRecord.Props["tags"]
{
    const copy = {...tags};
    selections.forEach(selection =>
    {
        copy[selection] = {
            ...copy[selection],
            status: TransactionRecord.TagStatus.Selected
        };
    });

    return copy;
}
