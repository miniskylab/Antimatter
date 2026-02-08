import {EMPTY_STRING, LunarCalendarVn} from "@miniskylab/antimatter-framework";
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
        isUsingLunarCalendar: true,
        secNotificationInterval: 3600,
        status: Reminder.Status.Scheduled,
        recurrencePattern: `0 0 0 1 1 ? *`,
        tags: deepCopyWithSelection(Tags, "feugiat", "mauris"),
        dueDate: LunarCalendarVn.getGregorianDate({year: today.getFullYear(), month: 1, date: 1, isLeapMonth: false}),
        modifiedDate: today,
        createdDate: today
    },
    "2": {
        isAlarmed: true,
        name: "Pretium",
        secNotificationInterval: 18000,
        status: Reminder.Status.Scheduled,
        tags: deepCopyWithSelection(Tags, "dolore", "tortor"),
        recurrencePattern: `59 59 23 ${today.getDate()} ${today.getMonth() + 1} ? *`,
        dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59),
        modifiedDate: today,
        createdDate: today
    },
    "3": {
        isSilenced: true,
        name: "Turpis massa tincidunt",
        status: Reminder.Status.Scheduled,
        recurrencePattern: `59 59 23 ${today.getDate()} ${today.getMonth() + 1} ? ${today.getFullYear()}`,
        tags: deepCopyWithSelection(Tags, "semper"),
        dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59),
        modifiedDate: today,
        createdDate: today
    },
    "4": {
        name: "Nulla pharetra",
        secNotificationInterval: 7200,
        status: Reminder.Status.Scheduled,
        tags: deepCopyWithSelection(Tags, "interdum"),
        recurrencePattern: `0 0 0 ${yesterday.getDate()} ${yesterday.getMonth() + 1} ? ${yesterday.getFullYear()}`,
        dueDate: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 0, 0, 0),
        modifiedDate: today,
        createdDate: today
    },
    "5": {
        name: "Pellentesque",
        status: Reminder.Status.Completed,
        recurrencePattern: `0 0 0 ${day45InThePast.getDate()} ${day45InThePast.getMonth() + 1} ? *`,
        tags: deepCopyWithSelection(Tags, "feugiat"),
        modifiedDate: today,
        createdDate: today
    },
    "6": {
        isAlarmed: true,
        name: "Risus",
        secNotificationInterval: 10800,
        status: Reminder.Status.Scheduled,
        tags: deepCopyWithSelection(Tags, "mauris"),
        recurrencePattern: `0 0 0 ${day45InThePast.getDate()} ${day45InThePast.getMonth() + 1} ? *`,
        dueDate: new Date(day45InThePast.getFullYear(), day45InThePast.getMonth(), day45InThePast.getDate(), 0, 0, 0),
        modifiedDate: today,
        createdDate: today
    },
    "7": {
        name: "Diam donec",
        recurrencePattern: "0 0 0 3",
        status: Reminder.Status.Scheduled,
        tags: deepCopyWithSelection(Tags, "dolore", "feugiat"),
        dueDate: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0),
        modifiedDate: today,
        createdDate: today
    },
    "8": {
        name: "Quam",
        secNotificationInterval: 14400,
        status: Reminder.Status.Scheduled,
        tags: deepCopyWithSelection(Tags, "volutpat"),
        recurrencePattern: `0 0 0 ${day45InTheFuture.getDate()} ${day45InTheFuture.getMonth() + 1} ? ${day45InTheFuture.getFullYear()}`,
        dueDate: new Date(day45InTheFuture.getFullYear(), day45InTheFuture.getMonth(), day45InTheFuture.getDate(), 0, 0, 0),
        modifiedDate: today,
        createdDate: today
    },
    "9": {
        name: "Urna molestie",
        status: Reminder.Status.Scheduled,
        tags: deepCopyWithSelection(Tags, "iaculis"),
        recurrencePattern: `0 0 0 ${day45InTheFuture.getDate()} * ? *`,
        dueDate: new Date(day45InTheFuture.getFullYear(), day45InTheFuture.getMonth(), day45InTheFuture.getDate(), 0, 0, 0),
        modifiedDate: today,
        createdDate: today
    },
    "10": {
        name: "Iaculis eu non",
        secNotificationInterval: 21600,
        status: Reminder.Status.Scheduled,
        tags: deepCopyWithSelection(Tags, "viverra", "metus"),
        recurrencePattern: `0 0 0 ${today.getDate()} ${today.getMonth() + 1} ? *`,
        modifiedDate: today,
        createdDate: today
    },
    "11": {
        name: "Phasellus vestibulum",
        recurrencePattern: EMPTY_STRING,
        status: Reminder.Status.Scheduled,
        tags: deepCopyWithSelection(Tags, "imperdiet"),
        modifiedDate: today,
        createdDate: today
    },
    "12": {
        name: "Nisi lacus sed",
        secNotificationInterval: 14400,
        status: Reminder.Status.Suspended,
        tags: deepCopyWithSelection(Tags, "massa"),
        recurrencePattern: `0 0 0 ${day45InThePast.getDate()} ${day45InThePast.getMonth() + 1} ? ${day45InThePast.getFullYear()}`,
        modifiedDate: today,
        createdDate: today
    },
    "13": {
        name: "Cursus turpis",
        secNotificationInterval: 10800,
        status: Reminder.Status.Suspended,
        tags: deepCopyWithSelection(Tags, "dolore", "tortor"),
        recurrencePattern: `0 0 0 ${day45InTheFuture.getDate()} ${day45InTheFuture.getMonth() + 1} ? *`,
        modifiedDate: today,
        createdDate: today
    },
    "14": {
        name: "Risus ultricies",
        secNotificationInterval: 7200,
        status: Reminder.Status.Scheduled,
        recurrencePattern: `0 0 0 ? * 1,5 *`,
        tags: deepCopyWithSelection(Tags, "adipiscing"),
        dueDate: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0),
        modifiedDate: today,
        createdDate: today
    },
    "15": {
        name: "Morbi tincidunt",
        secNotificationInterval: 3600,
        status: Reminder.Status.Completed,
        tags: deepCopyWithSelection(Tags, "dolore", "tortor"),
        recurrencePattern: `0 0 0 ${day45InThePast.getDate()} ${day45InThePast.getMonth() + 1} ? ${day45InThePast.getFullYear()}`,
        modifiedDate: today,
        createdDate: today
    },
    "16": {
        name: "Scelerisque",
        recurrencePattern: "!",
        status: Reminder.Status.Scheduled,
        tags: deepCopyWithSelection(Tags, "feugiat", "imperdiet"),
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
