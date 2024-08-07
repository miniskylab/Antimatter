import {Reminder} from "../../components";
import {TodoListProps} from "../../models";
import {Tags} from "./tags";

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

export const Reminders: NonNullable<TodoListProps["reminders"]> = {
    "1": {
        name: "Pulvinar",
        tags: deepCopyWithSelection(Tags, "feugiat", "mauris"),
        modifiedDate: today,
        createdDate: today
    },
    "2": {
        name: "Pretium",
        tags: deepCopyWithSelection(Tags, "dolore", "tortor"),
        modifiedDate: today,
        createdDate: today
    },
    "3": {
        name: "Turpis massa tincidunt",
        tags: deepCopyWithSelection(Tags, "semper"),
        modifiedDate: today,
        createdDate: today
    },
    "4": {
        name: "Nulla pharetra",
        tags: deepCopyWithSelection(Tags, "interdum"),
        modifiedDate: today,
        createdDate: today
    },
    "5": {
        name: "Pellentesque",
        tags: deepCopyWithSelection(Tags, "feugiat"),
        modifiedDate: today,
        createdDate: today
    },
    "6": {
        name: "Risus",
        tags: deepCopyWithSelection(Tags, "mauris"),
        modifiedDate: today,
        createdDate: today
    },
    "7": {
        name: "Diam donec",
        tags: deepCopyWithSelection(Tags, "dolore", "feugiat"),
        modifiedDate: today,
        createdDate: today
    },
    "8": {
        name: "Quam",
        tags: deepCopyWithSelection(Tags, "volutpat"),
        modifiedDate: today,
        createdDate: today
    },
    "9": {
        name: "Urna molestie",
        tags: deepCopyWithSelection(Tags, "iaculis"),
        modifiedDate: today,
        createdDate: today
    },
    "10": {
        name: "Iaculis eu non",
        tags: deepCopyWithSelection(Tags, "viverra", "metus"),
        modifiedDate: today,
        createdDate: today
    },
    "11": {
        name: "Phasellus vestibulum",
        tags: deepCopyWithSelection(Tags, "imperdiet"),
        modifiedDate: today,
        createdDate: today
    },
    "12": {
        name: "Nisi lacus sed",
        tags: deepCopyWithSelection(Tags, "massa"),
        modifiedDate: today,
        createdDate: today
    },
    "13": {
        name: "Risus ultricies",
        tags: deepCopyWithSelection(Tags, "adipiscing"),
        modifiedDate: today,
        createdDate: today
    },
    "14": {
        name: "Cursus turpis",
        tags: deepCopyWithSelection(Tags, "dolore", "tortor"),
        modifiedDate: yesterday,
        createdDate: yesterday
    },
    "15": {
        name: "Morbi tincidunt",
        tags: deepCopyWithSelection(Tags, "dolore", "tortor"),
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
