import {Reminder} from "../../components";
import {TodoListProps} from "../../models";
import {Tags} from "./tags";

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

export const Reminders: NonNullable<TodoListProps["reminders"]> = {
    "1": {
        name: "Pulvinar",
        recurrencePattern: "0 0 0 8 8 ? 2024",
        notificationIntervalInHours: 1,
        tags: deepCopyWithSelection(Tags, "feugiat"),
        modifiedDate: today,
        createdDate: today
    },
    "2": {
        name: "Pretium",
        recurrencePattern: "0 0 0 8 8 ? 2024",
        notificationIntervalInHours: 1,
        tags: deepCopyWithSelection(Tags, "dolore"),
        modifiedDate: today,
        createdDate: today
    },
    "3": {
        name: "Turpis massa tincidunt",
        recurrencePattern: "0 0 0 8 8 ? 2024",
        notificationIntervalInHours: 1,
        tags: deepCopyWithSelection(Tags, "semper"),
        modifiedDate: today,
        createdDate: today
    },
    "4": {
        name: "Nulla pharetra",
        recurrencePattern: "0 0 0 8 8 ? 2024",
        notificationIntervalInHours: 1,
        tags: deepCopyWithSelection(Tags, "interdum"),
        modifiedDate: today,
        createdDate: today
    },
    "5": {
        name: "Pellentesque",
        recurrencePattern: "0 0 0 8 8 ? 2024",
        notificationIntervalInHours: 1,
        tags: deepCopyWithSelection(Tags, "feugiat"),
        modifiedDate: today,
        createdDate: today
    },
    "6": {
        name: "Risus",
        recurrencePattern: "0 0 0 8 8 ? 2024",
        notificationIntervalInHours: 1,
        tags: deepCopyWithSelection(Tags, "mauris"),
        modifiedDate: today,
        createdDate: today
    },
    "7": {
        name: "Diam donec",
        recurrencePattern: "0 0 0 8 8 ? 2024",
        notificationIntervalInHours: 1,
        tags: deepCopyWithSelection(Tags, "feugiat"),
        modifiedDate: today,
        createdDate: today
    },
    "8": {
        name: "Quam",
        recurrencePattern: "0 0 0 8 8 ? 2024",
        notificationIntervalInHours: 1,
        tags: deepCopyWithSelection(Tags, "volutpat"),
        modifiedDate: today,
        createdDate: today
    },
    "9": {
        name: "Urna molestie",
        recurrencePattern: "0 0 0 8 8 ? 2024",
        notificationIntervalInHours: 1,
        tags: deepCopyWithSelection(Tags, "iaculis"),
        modifiedDate: today,
        createdDate: today
    },
    "10": {
        name: "Iaculis eu non",
        recurrencePattern: "0 0 0 8 8 ? 2024",
        notificationIntervalInHours: 1,
        tags: deepCopyWithSelection(Tags, "viverra"),
        modifiedDate: today,
        createdDate: today
    },
    "11": {
        name: "Phasellus vestibulum",
        recurrencePattern: "0 0 0 8 8 ? 2024",
        notificationIntervalInHours: 1,
        tags: deepCopyWithSelection(Tags, "imperdiet"),
        modifiedDate: today,
        createdDate: today
    },
    "12": {
        name: "Nisi lacus sed",
        recurrencePattern: "0 0 0 8 8 ? 2024",
        notificationIntervalInHours: 1,
        tags: deepCopyWithSelection(Tags, "massa"),
        modifiedDate: today,
        createdDate: today
    },
    "13": {
        name: "Risus ultricies",
        recurrencePattern: "0 0 0 8 8 ? 2024",
        notificationIntervalInHours: 1,
        tags: deepCopyWithSelection(Tags, "adipiscing"),
        modifiedDate: today,
        createdDate: today
    },
    "14": {
        name: "Cursus turpis",
        recurrencePattern: "0 0 0 8 8 ? 2024",
        notificationIntervalInHours: 1,
        tags: deepCopyWithSelection(Tags, "dolore"),
        modifiedDate: yesterday,
        createdDate: yesterday
    },
    "15": {
        name: "Morbi tincidunt",
        recurrencePattern: "0 0 0 8 8 ? 2024",
        notificationIntervalInHours: 1,
        tags: deepCopyWithSelection(Tags, "tortor"),
        modifiedDate: yesterday,
        createdDate: yesterday
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
