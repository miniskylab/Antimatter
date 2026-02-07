import {DataListDisplayPanelTheme} from "@miniskylab/antimatter-data-list";
import {EMPTY_STRING, withValidation} from "@miniskylab/antimatter-framework";
import {Sb} from "@miniskylab/antimatter-storybook";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import type {Meta, StoryObj} from "@storybook/react";
import React, {useRef} from "react";
import {useArgs} from "storybook/preview-api";
import {Reminder} from "../components";
import {TodoList} from "../main";
import {TodoListProps, type TodoListRef} from "../models";
import {TestData} from "./test-data";
import * as Variant from "./variants";

const TodoListWithValidation = withValidation(TodoList, TodoListProps);
export default {
    component: TodoList,
    title: "Components/Todo List",
    render: (args: Required<TodoListProps>) =>
    {
        type BusySettings = Pick<TodoListProps, "selectedReminder" | "addNewReminderButton" | "saveReminderButton" |
            "deleteReminderButton" | "cancelButton" | "customButton">;

        type UnbusySettings = Pick<TodoListProps, "addNewReminderButton" | "saveReminderButton" | "deleteReminderButton" | "cancelButton" |
            "customButton">;

        const busySettings: BusySettings = {
            selectedReminder: args.selectedReminder
                ? {
                    ...args.selectedReminder,
                    data: {
                        ...args.selectedReminder.data,
                        isShowingProgressStripes: true
                    }
                }
                : undefined,
            addNewReminderButton: {...args.addNewReminderButton, disabled: true},
            saveReminderButton: {...args.saveReminderButton, disabled: true},
            deleteReminderButton: {...args.deleteReminderButton, disabled: true},
            cancelButton: {...args.cancelButton, disabled: true},
            customButton: {...args.customButton, disabled: true}
        };
        const unbusySettings: UnbusySettings = {
            addNewReminderButton: {...args.addNewReminderButton, disabled: false},
            saveReminderButton: {...args.saveReminderButton, disabled: false},
            deleteReminderButton: {...args.deleteReminderButton, disabled: false},
            cancelButton: {...args.cancelButton, disabled: false},
            customButton: {...args.customButton, disabled: false}
        };

        const [, setArgs] = useArgs<TodoListProps>();
        const todoListRef = useRef<TodoListRef>(null);

        return (
            <TodoListWithValidation
                {...args}
                ref={todoListRef}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}
                dismissAllAlarmButton={{
                    ...args.dismissAllAlarmButton,
                    icon: DefaultIconSet.NoMic,
                    text: "Dismiss All",
                    onPress: async () =>
                    {
                        const alarmedReminderIds = Object.keys(TestData.Reminders).filter(x => TestData.Reminders[x].isAlarmed);
                        alarmedReminderIds.forEach(alarmedReminderId =>
                        {
                            TestData.Reminders[alarmedReminderId] = {...args.reminders[alarmedReminderId], isShowingProgressStripes: true};
                        });

                        setArgs({
                            ...busySettings,
                            mode: Reminder.Mode.Alarm,
                            reminders: {...TestData.Reminders},
                            displayPanel: {
                                icon: DefaultIconSet.Gear,
                                message: "Saving Reminders",
                                theme: DataListDisplayPanelTheme.Cautious,
                                isIconAnimationPlaying: true,
                                isVisible: true
                            }
                        });

                        await new Promise(resolve => { setTimeout(resolve, 2000); });
                        alarmedReminderIds.forEach(alarmedReminderId =>
                        {
                            TestData.Reminders[alarmedReminderId] = {
                                ...args.reminders[alarmedReminderId],
                                isShowingProgressStripes: false,
                                isAlarmed: false
                            };
                        });

                        todoListRef.current?.flashHighlightReminders(alarmedReminderIds);
                        setArgs({
                            ...unbusySettings,
                            selectedReminder: undefined,
                            mode: Reminder.Mode.ReadOnly,
                            reminders: {...TestData.Reminders},
                            displayPanel: {
                                icon: DefaultIconSet.CheckMark,
                                theme: DataListDisplayPanelTheme.Positive,
                                message: "Saved Successfully"
                            }
                        });
                    }
                }}
                saveAndDismissAlarmButton={{
                    ...args.saveAndDismissAlarmButton,
                    icon: DefaultIconSet.FloppyDisk,
                    text: "Save & Dismiss",
                    onPress: async () =>
                    {
                        setArgs({
                            ...busySettings,
                            mode: Reminder.Mode.Alarm,
                            displayPanel: {
                                icon: DefaultIconSet.Gear,
                                message: "Saving Reminder",
                                theme: DataListDisplayPanelTheme.Cautious,
                                isIconAnimationPlaying: true,
                                isVisible: true
                            }
                        });

                        await new Promise(resolve => { setTimeout(resolve, 2000); });

                        todoListRef.current?.flashHighlightReminders([args.selectedReminder.id]);
                        TestData.Reminders[args.selectedReminder.id] = {
                            ...args.reminders[args.selectedReminder.id],
                            isAlarmed: false,
                            secNotificationInterval: args.selectedReminder.data.secNotificationInterval,
                            status: args.selectedReminder.data.status,
                            dueDate: args.selectedReminder.data.dueDate,
                            modifiedDate: new Date()
                        };

                        setArgs({
                            ...unbusySettings,
                            selectedReminder: undefined,
                            reminders: {...TestData.Reminders},
                            mode: Object.values(TestData.Reminders).some(x => x.isAlarmed) ? Reminder.Mode.Alarm : Reminder.Mode.ReadOnly,
                            displayPanel: {
                                icon: DefaultIconSet.CheckMark,
                                theme: DataListDisplayPanelTheme.Positive,
                                message: "Saved Successfully"
                            }
                        });
                    }
                }}
                addNewReminderButton={{
                    ...args.addNewReminderButton,
                    icon: DefaultIconSet.PlusCircle,
                    text: "Add New",
                    onPress: () =>
                    {
                        setArgs({
                            mode: Reminder.Mode.Draft,
                            selectedReminder: {
                                id: EMPTY_STRING,
                                data: {
                                    isAlarmed: false,
                                    isSilenced: false,
                                    name: EMPTY_STRING,
                                    tags: TestData.Tags,
                                    isUsingLunarCalendar: false,
                                    secNotificationInterval: 60,
                                    recurrencePattern: EMPTY_STRING,
                                    status: Reminder.Status.Unscheduled
                                }
                            }
                        });
                    }
                }}
                saveReminderButton={{
                    ...args.saveReminderButton,
                    icon: DefaultIconSet.FloppyDisk,
                    text: "Save",
                    onPress: async () =>
                    {
                        setArgs({
                            ...busySettings,
                            mode: Reminder.Mode.ReadOnly,
                            displayPanel: {
                                icon: DefaultIconSet.Gear,
                                message: "Saving Reminder",
                                theme: DataListDisplayPanelTheme.Highlighted,
                                isIconAnimationPlaying: true,
                                isVisible: true
                            }
                        });

                        await new Promise(resolve => { setTimeout(resolve, 2000); });
                        if (args.selectedReminder.id === EMPTY_STRING)
                        {
                            const newlyAddedReminderId = `${Date.now()}`;
                            todoListRef.current?.flashHighlightReminders([newlyAddedReminderId]);

                            TestData.Reminders[newlyAddedReminderId] = {
                                name: args.selectedReminder.data.name,
                                tags: args.selectedReminder.data.tags,
                                status: args.selectedReminder.data.status,
                                isAlarmed: args.selectedReminder.data.isAlarmed,
                                isSilenced: args.selectedReminder.data.isSilenced,
                                lunarDueDate: args.selectedReminder.data.lunarDueDate,
                                isUsingLunarCalendar: args.selectedReminder.data.isUsingLunarCalendar,
                                secNotificationInterval: args.selectedReminder.data.secNotificationInterval,
                                recurrencePattern: args.selectedReminder.data.recurrencePattern,
                                dueDate: args.selectedReminder.data.dueDate,
                                createdDate: new Date()
                            };
                        }
                        else
                        {
                            todoListRef.current?.flashHighlightReminders([args.selectedReminder.id]);
                            TestData.Reminders[args.selectedReminder.id] = {
                                ...args.reminders[args.selectedReminder.id],
                                name: args.selectedReminder.data.name,
                                tags: args.selectedReminder.data.tags,
                                status: args.selectedReminder.data.status,
                                isAlarmed: args.selectedReminder.data.isAlarmed,
                                isSilenced: args.selectedReminder.data.isSilenced,
                                lunarDueDate: args.selectedReminder.data.lunarDueDate,
                                isUsingLunarCalendar: args.selectedReminder.data.isUsingLunarCalendar,
                                secNotificationInterval: args.selectedReminder.data.secNotificationInterval,
                                recurrencePattern: args.selectedReminder.data.recurrencePattern,
                                dueDate: args.selectedReminder.data.dueDate,
                                modifiedDate: new Date()
                            };
                        }

                        setArgs({
                            ...unbusySettings,
                            selectedReminder: undefined,
                            reminders: {...TestData.Reminders},
                            displayPanel: {
                                icon: DefaultIconSet.CheckMark,
                                theme: DataListDisplayPanelTheme.Positive,
                                message: "Saved Successfully"
                            }
                        });
                    }
                }}
                deleteReminderButton={{
                    ...args.deleteReminderButton,
                    icon: DefaultIconSet.TrashCan,
                    text: "Delete",
                    onPress: async () =>
                    {
                        setArgs({
                            ...busySettings,
                            displayPanel: {
                                icon: DefaultIconSet.Gear,
                                message: "Deleting Reminder",
                                theme: DataListDisplayPanelTheme.Negative,
                                isIconAnimationPlaying: true,
                                isVisible: true
                            }
                        });

                        await new Promise(resolve => { setTimeout(resolve, 2000); });
                        delete TestData.Reminders[args.selectedReminder.id];

                        setArgs({
                            ...unbusySettings,
                            mode: Reminder.Mode.ReadOnly,
                            reminders: {...TestData.Reminders},
                            selectedReminder: undefined,
                            displayPanel: {
                                icon: DefaultIconSet.CheckMark,
                                theme: DataListDisplayPanelTheme.Positive,
                                message: "Deleted Successfully"
                            }
                        });
                    }
                }}
                cancelButton={{
                    ...args.cancelButton,
                    icon: DefaultIconSet.XMarkInsideCircle,
                    text: "Cancel",
                    onPress: () =>
                    {
                        setArgs({
                            mode: args.mode === Reminder.Mode.Dismiss ? Reminder.Mode.Alarm : Reminder.Mode.ReadOnly,
                            selectedReminder: undefined
                        });
                    }
                }}
                customButton={{
                    ...args.customButton,
                    icon: DefaultIconSet.Group,
                    text: "Lorem Ipsum: 99",
                    onPress: () => { alert("Lorem Ipsum"); }
                }}
                onSwitchMode={newMode =>
                {
                    setArgs({
                        mode: newMode,
                        selectedReminder: {
                            id: args.selectedReminder.id,
                            data: {
                                name: args.reminders[args.selectedReminder.id].name,
                                tags: args.reminders[args.selectedReminder.id].tags,
                                status: args.reminders[args.selectedReminder.id].status,
                                dueDate: args.reminders[args.selectedReminder.id].dueDate,
                                isAlarmed: args.reminders[args.selectedReminder.id].isAlarmed,
                                isSilenced: args.reminders[args.selectedReminder.id].isSilenced,
                                lunarDueDate: args.reminders[args.selectedReminder.id].lunarDueDate,
                                isUsingLunarCalendar: args.reminders[args.selectedReminder.id].isUsingLunarCalendar,
                                secNotificationInterval: args.reminders[args.selectedReminder.id].secNotificationInterval,
                                recurrencePattern: args.reminders[args.selectedReminder.id].recurrencePattern,
                                modifiedDate: args.reminders[args.selectedReminder.id].modifiedDate,
                                createdDate: args.reminders[args.selectedReminder.id].createdDate
                            }
                        }
                    });
                }}
                onChangeReminder={newReminderData =>
                {
                    setArgs({
                        selectedReminder: {
                            id: args.selectedReminder.id,
                            data: {
                                ...args.selectedReminder.data,
                                ...newReminderData
                            }
                        }
                    });
                }}
                onSelectReminder={reminderId =>
                {
                    setArgs({
                        mode: args.mode === Reminder.Mode.Alarm ? Reminder.Mode.Dismiss : Reminder.Mode.Edit,
                        selectedReminder: {
                            id: reminderId,
                            data: {
                                name: args.reminders[reminderId].name,
                                tags: args.reminders[reminderId].tags,
                                status: args.reminders[reminderId].status,
                                dueDate: args.reminders[reminderId].dueDate,
                                isAlarmed: args.reminders[reminderId].isAlarmed,
                                isSilenced: args.reminders[reminderId].isSilenced,
                                lunarDueDate: args.reminders[reminderId].lunarDueDate,
                                isUsingLunarCalendar: args.reminders[reminderId].isUsingLunarCalendar,
                                secNotificationInterval: args.reminders[reminderId].secNotificationInterval,
                                recurrencePattern: args.reminders[reminderId].recurrencePattern,
                                modifiedDate: args.reminders[reminderId].modifiedDate,
                                createdDate: args.reminders[reminderId].createdDate
                            }
                        }
                    });
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
        reminderRecurrencePatternPlaceholder: Sb.text(),
        reminderNotificationIntervalLabel: Sb.text(),
        hourReminderNotificationIntervalPlaceholder: Sb.text(),
        minuteReminderNotificationIntervalPlaceholder: Sb.text(),
        secReminderNotificationIntervalPlaceholder: Sb.text(),
        mode: Sb.locked,
        displayPanel: Sb.locked,
        dismissAllAlarmButton: Sb.locked,
        saveAndDismissAlarmButton: Sb.locked,
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
        style: Sb.getVariantName(Variant, Variant.Storybook),
        maxSelectedTagCount: 2,
        reminderRecurrencePatternPlaceholder: "Recurrence Pattern",
        reminderNotificationIntervalLabel: "Notification Interval",
        hourReminderNotificationIntervalPlaceholder: "Hour",
        minuteReminderNotificationIntervalPlaceholder: "Minute",
        secReminderNotificationIntervalPlaceholder: "Second",
        mode: Reminder.Mode.Alarm,
        reminders: {...TestData.Reminders}
    }
};
