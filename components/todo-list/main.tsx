import {DataList, type DataListControlPanel} from "@miniskylab/antimatter-data-list";
import {type AllPropertiesMustPresent, Nullable, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import React, {JSX, useEffect, useMemo, useRef, useState} from "react";
import {Reminder} from "./components";
import {TodoListContext, TodoListProps, TodoListState} from "./models";
import * as Variant from "./variants";

/**
 * A component that alerts users of reminders they have input previously.
 */
export function TodoList({
    style = Variant.Default,
    reminders = {},
    selectedReminder,
    mode = Reminder.Mode.ReadOnly,
    maxSelectedTagCount = 2,
    displayPanel,
    addNewReminderButton,
    saveReminderButton,
    deleteReminderButton,
    cancelButton,
    customButton,
    onSwitchMode,
    onChangeReminder,
    onSelectReminder
}: TodoListProps): JSX.Element
{
    const props: AllPropertiesMustPresent<TodoListProps> = {
        style, reminders, selectedReminder, mode, maxSelectedTagCount, displayPanel, addNewReminderButton, saveReminderButton,
        deleteReminderButton, cancelButton, customButton, onSwitchMode, onChangeReminder, onSelectReminder
    };

    const [state, _] = useState<TodoListState>({
        toBeDeletedReminders: {}
    });

    const context = useMemo<TodoListContext>(
        () => ({props, state}),
        [...Object.values(props), ...Object.values(state)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    const lastSelectedReminderIdRef = useRef<string>();
    const remindersRef = useRef<Record<string, Nullable<Reminder.Ref>>>({});

    const {button1, button2, button3} = useMemo(
        () => getControlPanel(),
        [mode, addNewReminderButton, saveReminderButton, deleteReminderButton, cancelButton, customButton]
    );

    useEffect(() =>
    {
        if (selectedReminder)
        {
            const expandSelectedReminder = remindersRef.current[selectedReminder.id]?.expandHeight;
            expandSelectedReminder && expandSelectedReminder();
        }
        else if (lastSelectedReminderIdRef.current)
        {
            const contractLastSelectedReminder = remindersRef.current[lastSelectedReminderIdRef.current]?.contractHeight;
            contractLastSelectedReminder && contractLastSelectedReminder();
        }

        lastSelectedReminderIdRef.current = selectedReminder?.id;
    }, [selectedReminder]);

    return (
        <TodoListContext.Provider value={context}>
            <DataList
                style={computedStyle.DataList}
                displayPanel={displayPanel}
                button1={button1}
                button2={button2}
                button3={button3}
            >
                {renderReminders()}
            </DataList>
        </TodoListContext.Provider>
    );

    function getControlPanel(): DataListControlPanel
    {
        switch (mode)
        {
            case Reminder.Mode.Draft:
                return {
                    button1: {...saveReminderButton},
                    button2: {icon: DefaultIconSet.Quill, text: "Draft-Mode", disabled: true},
                    button3: {...cancelButton}
                };

            case Reminder.Mode.Edit:
                return {
                    button1: {...saveReminderButton},
                    button2: {icon: DefaultIconSet.Quill, text: "Edit-Mode", onPress: switchMode},
                    button3: {...cancelButton}
                };

            case Reminder.Mode.Delete:
                return {
                    button1: {...deleteReminderButton},
                    button2: {icon: DefaultIconSet.Fire, text: "Delete-Mode", onPress: switchMode},
                    button3: {...cancelButton}
                };

            default:
            case Reminder.Mode.ReadOnly:
                return {
                    button1: {...addNewReminderButton},
                    button2: {icon: DefaultIconSet.Eye, text: "Read-Only", disabled: true},
                    button3: customButton ? {...customButton} : {...cancelButton, disabled: true}
                };
        }
    }

    function getReminderMode(reminderId: string): Reminder.Mode
    {
        return reminderId === selectedReminder?.id
            ? mode
            : Reminder.Mode.ReadOnly;
    }

    function renderReminders(): JSX.Element[]
    {
        return Object.keys(reminders).map(reminderId =>
        {
            const reminderMode = getReminderMode(reminderId);
            const reminderData = reminders[reminderId];
            const isSelectedReminder = reminderId === selectedReminder?.id;
            const isToBeDeletedReminder = !!state.toBeDeletedReminders[reminderId];

            return (
                <Reminder.Component
                    {...reminderData}
                    key={reminderId}
                    id={reminderId}
                    ref={ref => { remindersRef.current[reminderId] = ref; }}
                    style={computedStyle.Reminder}
                    mode={reminderMode}
                    tags={reminderData?.tags}
                    maxSelectedTagCount={maxSelectedTagCount}
                    showProgressStripes={isSelectedReminder && selectedReminder?.showProgressStripes}
                    toBeDeleted={isToBeDeletedReminder}
                    onPress={!selectedReminder ? () => { onSelectReminder?.(reminderId); } : undefined}
                    onChange={newReminderData => { onChangeReminder?.(newReminderData); }}
                />
            );
        });
    }

    function switchMode(): void
    {
        switch (mode)
        {
            case Reminder.Mode.ReadOnly:
                onSwitchMode?.(Reminder.Mode.Draft);
                break;

            case Reminder.Mode.Edit:
                onSwitchMode?.(Reminder.Mode.Delete);
                break;

            case Reminder.Mode.Delete:
                onSwitchMode?.(Reminder.Mode.Edit);
                break;

            default:
                throw new Error(`No valid mode to switch to from mode "${Ts.Enum.getName(Reminder.Mode, mode)}"`);
        }
    }
}
