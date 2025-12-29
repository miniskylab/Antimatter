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
        isAlarmed: true,
        isSilenced: false,
        name: "Pulvinar",
        recurrencePattern: `0 0 0 ${today.getDate()} * ? *`,
        secNotificationInterval: 3600,
        tags: deepCopyWithSelection(Tags, "feugiat", "mauris"),
        status: Reminder.Status.Scheduled,
        dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
        modifiedDate: today,
        createdDate: today
    },
    "2": {
        isAlarmed: true,
        isSilenced: false,
        name: "Pretium",
        recurrencePattern: `59 59 23 ${today.getDate()} ${today.getMonth() + 1} ? *`,
        secNotificationInterval: 18000,
        tags: deepCopyWithSelection(Tags, "dolore", "tortor"),
        status: Reminder.Status.Scheduled,
        dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59),
        modifiedDate: today,
        createdDate: today
    },
    "3": {
        isSilenced: true,
        name: "Turpis massa tincidunt",
        recurrencePattern: `59 59 23 ${today.getDate()} ${today.getMonth() + 1} ? ${today.getFullYear()}`,
        secNotificationInterval: undefined,
        tags: deepCopyWithSelection(Tags, "semper"),
        status: Reminder.Status.Scheduled,
        dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59),
        modifiedDate: today,
        createdDate: today
    },
    "4": {
        isSilenced: false,
        name: "Nulla pharetra",
        recurrencePattern: `0 0 0 ${yesterday.getDate()} ${yesterday.getMonth() + 1} ? ${yesterday.getFullYear()}`,
        secNotificationInterval: 7200,
        tags: deepCopyWithSelection(Tags, "interdum"),
        status: Reminder.Status.Scheduled,
        dueDate: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 0, 0, 0),
        modifiedDate: today,
        createdDate: today
    },
    "5": {
        isSilenced: false,
        name: "Pellentesque",
        recurrencePattern: `0 0 0 ${day45InThePast.getDate()} ${day45InThePast.getMonth() + 1} ? *`,
        secNotificationInterval: undefined,
        tags: deepCopyWithSelection(Tags, "feugiat"),
        status: Reminder.Status.Completed,
        modifiedDate: today,
        createdDate: today
    },
    "6": {
        isSilenced: false,
        isAlarmed: true,
        name: "Risus",
        recurrencePattern: `0 0 0 ${day45InThePast.getDate()} ${day45InThePast.getMonth() + 1} ? *`,
        secNotificationInterval: 10800,
        tags: deepCopyWithSelection(Tags, "mauris"),
        status: Reminder.Status.Scheduled,
        dueDate: new Date(day45InThePast.getFullYear(), day45InThePast.getMonth(), day45InThePast.getDate(), 0, 0, 0),
        modifiedDate: today,
        createdDate: today
    },
    "7": {
        isSilenced: false,
        name: "Diam donec",
        recurrencePattern: "0 0 0 3",
        secNotificationInterval: undefined,
        tags: deepCopyWithSelection(Tags, "dolore", "feugiat"),
        status: Reminder.Status.Scheduled,
        dueDate: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0),
        modifiedDate: today,
        createdDate: today
    },
    "8": {
        isSilenced: false,
        name: "Quam",
        recurrencePattern: `0 0 0 ${day45InTheFuture.getDate()} ${day45InTheFuture.getMonth() + 1} ? ${day45InTheFuture.getFullYear()}`,
        secNotificationInterval: 14400,
        tags: deepCopyWithSelection(Tags, "volutpat"),
        status: Reminder.Status.Scheduled,
        dueDate: new Date(day45InTheFuture.getFullYear(), day45InTheFuture.getMonth(), day45InTheFuture.getDate(), 0, 0, 0),
        modifiedDate: today,
        createdDate: today
    },
    "9": {
        isSilenced: false,
        name: "Urna molestie",
        recurrencePattern: `0 0 0 ${day45InTheFuture.getDate()} * ? *`,
        secNotificationInterval: undefined,
        tags: deepCopyWithSelection(Tags, "iaculis"),
        status: Reminder.Status.Scheduled,
        dueDate: new Date(day45InTheFuture.getFullYear(), day45InTheFuture.getMonth(), day45InTheFuture.getDate(), 0, 0, 0),
        modifiedDate: today,
        createdDate: today
    },
    "10": {
        isSilenced: false,
        name: "Iaculis eu non",
        recurrencePattern: `0 0 0 ${today.getDate()} ${today.getMonth() + 1} ? *`,
        secNotificationInterval: 21600,
        tags: deepCopyWithSelection(Tags, "viverra", "metus"),
        status: Reminder.Status.Scheduled,
        modifiedDate: today,
        createdDate: today
    },
    "11": {
        isSilenced: false,
        name: "Phasellus vestibulum",
        recurrencePattern: EMPTY_STRING,
        secNotificationInterval: undefined,
        tags: deepCopyWithSelection(Tags, "imperdiet"),
        status: Reminder.Status.Scheduled,
        modifiedDate: today,
        createdDate: today
    },
    "12": {
        isSilenced: false,
        name: "Nisi lacus sed",
        recurrencePattern: `0 0 0 ${day45InThePast.getDate()} ${day45InThePast.getMonth() + 1} ? ${day45InThePast.getFullYear()}`,
        secNotificationInterval: 14400,
        tags: deepCopyWithSelection(Tags, "massa"),
        status: Reminder.Status.Suspended,
        modifiedDate: today,
        createdDate: today
    },
    "13": {
        isSilenced: false,
        name: "Cursus turpis",
        recurrencePattern: `0 0 0 ${day45InTheFuture.getDate()} ${day45InTheFuture.getMonth() + 1} ? *`,
        secNotificationInterval: 10800,
        tags: deepCopyWithSelection(Tags, "dolore", "tortor"),
        status: Reminder.Status.Suspended,
        modifiedDate: today,
        createdDate: today
    },
    "14": {
        isSilenced: false,
        name: "Risus ultricies",
        recurrencePattern: `0 0 0 ? * 1,5 *`,
        secNotificationInterval: 7200,
        tags: deepCopyWithSelection(Tags, "adipiscing"),
        status: Reminder.Status.Scheduled,
        dueDate: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0),
        modifiedDate: today,
        createdDate: today
    },
    "15": {
        isSilenced: false,
        name: "Morbi tincidunt",
        recurrencePattern: `0 0 0 ${day45InThePast.getDate()} ${day45InThePast.getMonth() + 1} ? ${day45InThePast.getFullYear()}`,
        secNotificationInterval: 3600,
        tags: deepCopyWithSelection(Tags, "dolore", "tortor"),
        status: Reminder.Status.Completed,
        modifiedDate: today,
        createdDate: today
    },
    "16": {
        isSilenced: false,
        name: "Scelerisque",
        recurrencePattern: "!",
        tags: deepCopyWithSelection(Tags, "feugiat", "imperdiet"),
        status: Reminder.Status.Scheduled,
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
