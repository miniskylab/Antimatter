import {EMPTY_STRING} from "@miniskylab/antimatter-framework";
import {Reminder} from "../../components";
import {TodoListProps} from "../../models";
import {Tags} from "./tags";

const today = new Date();
const yesterday = new Date(today);
const tomorrow = new Date(today);
const day45InThePast = new Date(today);
const day45InTheFuture = new Date(today);

yesterday.setDate(yesterday.getDate() - 1);
tomorrow.setDate(tomorrow.getDate() + 1);
day45InThePast.setDate(day45InThePast.getDate() - 45);
day45InTheFuture.setDate(day45InTheFuture.getDate() + 45);

export const Reminders: NonNullable<TodoListProps["reminders"]> = {
    "1": {
        name: "Pulvinar",
        recurrencePattern: `0 0 0 ${today.getDate()} ${today.getMonth() + 1} ? ${today.getFullYear()}`,
        notificationInterval: 1,
        tags: deepCopyWithSelection(Tags, "feugiat", "mauris"),
        modifiedDate: today,
        createdDate: today
    },
    "2": {
        name: "Pretium",
        recurrencePattern: `0 0 10 ${today.getDate()} ${today.getMonth() + 1} ? ${today.getFullYear()}`,
        notificationInterval: 5,
        tags: deepCopyWithSelection(Tags, "dolore", "tortor"),
        modifiedDate: today,
        createdDate: today
    },
    "3": {
        name: "Turpis massa tincidunt",
        recurrencePattern: `0 0 20 ${today.getDate()} ${today.getMonth() + 1} ? ${today.getFullYear()}`,
        notificationInterval: 0,
        tags: deepCopyWithSelection(Tags, "semper"),
        modifiedDate: today,
        createdDate: today
    },
    "4": {
        name: "Nulla pharetra",
        recurrencePattern: `0 0 0 ${yesterday.getDate()} ${yesterday.getMonth() + 1} ? ${yesterday.getFullYear()}`,
        notificationInterval: 2,
        tags: deepCopyWithSelection(Tags, "interdum"),
        modifiedDate: today,
        createdDate: today
    },
    "5": {
        name: "Pellentesque",
        recurrencePattern: `0 0 0 ${yesterday.getDate()} ${yesterday.getMonth() + 1} ? ${yesterday.getFullYear()}`,
        notificationInterval: 0,
        tags: deepCopyWithSelection(Tags, "feugiat"),
        modifiedDate: today,
        createdDate: today
    },
    "6": {
        name: "Risus",
        recurrencePattern: `0 0 0 ${day45InThePast.getDate()} ${day45InThePast.getMonth() + 1} ? ${day45InThePast.getFullYear()}`,
        notificationInterval: 3,
        tags: deepCopyWithSelection(Tags, "mauris"),
        modifiedDate: today,
        createdDate: today
    },
    "7": {
        name: "Diam donec",
        recurrencePattern: `0 0 0 ${day45InThePast.getDate()} ${day45InThePast.getMonth() + 1} ? ${day45InThePast.getFullYear()}`,
        notificationInterval: 0,
        tags: deepCopyWithSelection(Tags, "dolore", "feugiat"),
        modifiedDate: today,
        createdDate: today
    },
    "8": {
        name: "Quam",
        recurrencePattern: `0 0 0 ${day45InTheFuture.getDate()} ${day45InTheFuture.getMonth() + 1} ? ${day45InTheFuture.getFullYear()}`,
        notificationInterval: 4,
        tags: deepCopyWithSelection(Tags, "volutpat"),
        modifiedDate: today,
        createdDate: today
    },
    "9": {
        name: "Urna molestie",
        recurrencePattern: `0 0 0 ${day45InTheFuture.getDate()} ${day45InTheFuture.getMonth() + 1} ? ${day45InTheFuture.getFullYear()}`,
        notificationInterval: 0,
        tags: deepCopyWithSelection(Tags, "iaculis"),
        modifiedDate: today,
        createdDate: today
    },
    "10": {
        name: "Iaculis eu non",
        recurrencePattern: EMPTY_STRING,
        notificationInterval: 6,
        tags: deepCopyWithSelection(Tags, "viverra", "metus"),
        modifiedDate: today,
        createdDate: today
    },
    "11": {
        name: "Phasellus vestibulum",
        recurrencePattern: EMPTY_STRING,
        notificationInterval: 0,
        tags: deepCopyWithSelection(Tags, "imperdiet"),
        modifiedDate: today,
        createdDate: today
    },
    "12": {
        name: "Nisi lacus sed",
        recurrencePattern: `0 0 0 ${tomorrow.getDate()} ${tomorrow.getMonth() + 1} ? ${tomorrow.getFullYear()}`,
        notificationInterval: 7,
        tags: deepCopyWithSelection(Tags, "massa"),
        modifiedDate: today,
        createdDate: today
    },
    "13": {
        name: "Risus ultricies",
        recurrencePattern: `0 0 0 ${tomorrow.getDate()} ${tomorrow.getMonth() + 1} ? ${tomorrow.getFullYear()}`,
        notificationInterval: 0,
        tags: deepCopyWithSelection(Tags, "adipiscing"),
        modifiedDate: today,
        createdDate: today
    },
    "14": {
        name: "Cursus turpis",
        recurrencePattern: "Done",
        notificationInterval: 9,
        tags: deepCopyWithSelection(Tags, "dolore", "tortor"),
        modifiedDate: today,
        createdDate: today
    },
    "15": {
        name: "Morbi tincidunt",
        recurrencePattern: "Done",
        notificationInterval: 0,
        tags: deepCopyWithSelection(Tags, "dolore", "tortor"),
        modifiedDate: today,
        createdDate: today
    }
};

function deepCopyWithSelection(tags: Reminder.Props["tags"], ...selections: string[]): Reminder.Props["tags"]
{
    const copy = {...tags};
    selections.forEach(selection =>
    {
        copy[selection] = {
            ...copy[selection],
            status: Reminder.TagStatus.Selected
        };
    });

    return copy;
}
