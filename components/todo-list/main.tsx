import {type AllPropertiesMustPresent, Nullable, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {DataList, DataListOperationMode} from "@miniskylab/data-list";
import React, {JSX, useMemo, useRef, useState} from "react";
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
    mode = DataListOperationMode.ReadOnly,
    maxSelectedTagCount = 3,
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

    const remindersRef = useRef<Record<string, Nullable<Reminder.Ref>>>({});

    return (
        <TodoListContext.Provider value={context}>
            <DataList
                style={computedStyle.Root}
                mode={mode}
                displayPanel={displayPanel}
                addNewButton={addNewReminderButton}
                saveButton={saveReminderButton}
                deleteButton={deleteReminderButton}
                cancelButton={cancelButton}
                customButton={customButton}
                onSwitchMode={onSwitchMode}
            >
                {renderReminders()}
            </DataList>
        </TodoListContext.Provider>
    );

    function getReminderMode(reminderId: string): DataListOperationMode
    {
        return reminderId === selectedReminder?.id
            ? mode
            : DataListOperationMode.ReadOnly;
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
}
