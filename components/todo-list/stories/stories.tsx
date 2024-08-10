import {withValidation} from "@miniskylab/antimatter-framework";
import {Sb} from "@miniskylab/antimatter-storybook";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {useArgs} from "@storybook/preview-api";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {Reminder} from "../components";
import {TodoList} from "../main";
import {TodoListProps} from "../models";
import * as Variant from "../variants";
import {TestData} from "./test-data";

const TodoListWithValidation = withValidation(TodoList, TodoListProps);
export default {
    component: TodoList,
    title: "Components/Todo List",
    render: (args: Required<TodoListProps>) =>
    {
        const [, setArgs] = useArgs<TodoListProps>();
        return (
            <TodoListWithValidation
                {...args}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}
                addNewReminderButton={{
                    ...args.addNewReminderButton,
                    icon: DefaultIconSet.PlusCircle,
                    text: "Add New",
                    onPress: () => { }
                }}
                saveReminderButton={{
                    ...args.saveReminderButton,
                    icon: DefaultIconSet.FloppyDisk,
                    text: "Save",
                    onPress: async () => { }
                }}
                deleteReminderButton={{
                    ...args.deleteReminderButton,
                    icon: DefaultIconSet.TrashCan,
                    text: "Delete",
                    onPress: async () => { }
                }}
                cancelButton={{
                    ...args.cancelButton,
                    icon: DefaultIconSet.XMarkInsideCircle,
                    text: "Cancel",
                    onPress: () =>
                    {
                        const mode = Reminder.Mode.ReadOnly;
                        setArgs({
                            mode,
                            selectedReminder: undefined
                        });
                    }
                }}
                onSelectReminder={reminderId =>
                {
                    const mode = Reminder.Mode.Edit;
                    const selectedReminder: TodoListProps["selectedReminder"] = {
                        id: reminderId,
                        data: {
                            name: args.reminders[reminderId].name,
                            tags: args.reminders[reminderId].tags,
                            modifiedDate: args.reminders[reminderId].modifiedDate,
                            createdDate: args.reminders[reminderId].createdDate
                        }
                    };

                    setArgs({mode, selectedReminder});
                }}
            />
        );
    }
} satisfies Meta<typeof TodoList>;
type Story = StoryObj<typeof TodoList>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        maxSelectedTagCount: Sb.number(0),
        reminders: Sb.locked,
        selectedReminder: Sb.locked,
        mode: Sb.locked,
        displayPanel: Sb.locked,
        addNewReminderButton: Sb.locked,
        saveReminderButton: Sb.locked,
        deleteReminderButton: Sb.locked,
        cancelButton: Sb.locked,
        customButton: Sb.locked,
        onChangeReminder: Sb.locked,
        onSelectReminder: Sb.locked,
        onSwitchMode: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        maxSelectedTagCount: 2,
        reminders: {...TestData.Reminders}
    }
};
