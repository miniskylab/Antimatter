import {DataList, type DataListControlPanel} from "@miniskylab/antimatter-data-list";
import {
    type AllPropertiesMustPresent,
    EMPTY_STRING,
    isNotNullAndUndefined,
    isNullOrUndefined,
    type Nullable,
    Ts,
    useComponentContext,
    useComputedStyle
} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import React, {forwardRef, JSX, MutableRefObject, useEffect, useImperativeHandle, useMemo, useRef, useState} from "react";
import {Reminder} from "./components";
import {TodoListContext, TodoListProps, type TodoListRef, type TodoListState} from "./models";
import * as Variant from "./variants";

/**
 * A component that alerts users of reminders they have input previously.
 */
export const TodoList = forwardRef(function TodoList(
    {
        style = Variant.Default,
        reminders = {},
        selectedReminder,
        reminderRecurrencePatternPlaceholder = EMPTY_STRING,
        reminderNotificationIntervalPlaceholder = EMPTY_STRING,
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
    }: TodoListProps,
    ref: MutableRefObject<TodoListRef>
): JSX.Element | null
{
    const props: AllPropertiesMustPresent<TodoListProps> = {
        style, reminderRecurrencePatternPlaceholder, reminderNotificationIntervalPlaceholder, reminders, selectedReminder, mode,
        maxSelectedTagCount, displayPanel, addNewReminderButton, saveReminderButton, deleteReminderButton, cancelButton, customButton,
        onSwitchMode, onChangeReminder, onSelectReminder
    };

    const [state, setState] = useState<TodoListState>({
        toBeDeletedReminders: {},
        previousReminders: reminders
    });

    const lastSelectedReminderIdRef = useRef<string>();
    const toBeFlashHighlightedReminderIdsRef = useRef<string[]>([]);
    const remindersRef = useRef<Record<string, Nullable<Reminder.Ref>>>({});

    const today = new Date();
    const computedDueDates = useMemo(() => getComputedDueDates(), [reminders]);
    const unifiedReminderList = useMemo(() => getUnifiedReminderList(), [reminders, selectedReminder, state.toBeDeletedReminders]);
    const {button1, button2, button3} = useMemo(
        () => getControlPanel(),
        [mode, addNewReminderButton, saveReminderButton, deleteReminderButton, cancelButton, customButton]
    );

    const context = useComponentContext<TodoListContext>({props, state});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    useImperativeHandle(ref, () => ({
        flashHighlightReminders(reminderIds) { toBeFlashHighlightedReminderIdsRef.current = [...reminderIds]; }
    }), []);

    useEffect(() =>
    {
        const reminderIds = Object.keys(reminders);
        Object.keys(remindersRef)
            .filter(x => !reminderIds.includes(x))
            .forEach(x => { delete remindersRef.current[x]; });
    }, [reminders]);

    useEffect(() =>
    {
        let reminderId = toBeFlashHighlightedReminderIdsRef.current.pop();
        while (reminderId)
        {
            remindersRef.current[reminderId]?.flashHighlight?.();
            reminderId = toBeFlashHighlightedReminderIdsRef.current.pop();
        }
    }, [toBeFlashHighlightedReminderIdsRef.current]);

    useEffect(() =>
    {
        Object.keys(state.toBeDeletedReminders)
            .forEach(toBeDeletedReminderId =>
            {
                const playExitAnimation = remindersRef.current[toBeDeletedReminderId]?.collapseHeight;
                playExitAnimation ? playExitAnimation(onAnimationEnd) : onAnimationEnd();

                function onAnimationEnd()
                {
                    setState(prevState =>
                    {
                        const nextToBeDeletedReminders = {...prevState.toBeDeletedReminders};
                        delete nextToBeDeletedReminders[toBeDeletedReminderId];

                        return {...prevState, toBeDeletedReminders: nextToBeDeletedReminders};
                    });
                }
            });
    }, [state.toBeDeletedReminders]);

    useEffect(() =>
    {
        if (selectedReminder)
        {
            if (mode === Reminder.Mode.Delete || mode === Reminder.Mode.ReadOnly)
            {
                const contractSelectedReminder = remindersRef.current[selectedReminder.id]?.contractHeight;
                contractSelectedReminder?.();
            }
            else
            {
                const expandSelectedReminder = remindersRef.current[selectedReminder.id]?.editModeExpandHeight;
                expandSelectedReminder?.();
            }
        }
        else if (lastSelectedReminderIdRef.current)
        {
            const lastSelectedReminderId = lastSelectedReminderIdRef.current;
            const isLastSelectedReminderMarkedForDeletion = Object.keys(state.toBeDeletedReminders).includes(lastSelectedReminderId);
            if (!isLastSelectedReminderMarkedForDeletion)
            {
                const contractLastSelectedReminder = remindersRef.current[lastSelectedReminderId]?.contractHeight;
                contractLastSelectedReminder?.();
            }
        }

        lastSelectedReminderIdRef.current = selectedReminder?.id;
    }, [selectedReminder, mode]);

    if (reminders !== state.previousReminders)
    {
        setState(prevState => ({
            ...prevState,
            previousReminders: reminders,
            toBeDeletedReminders: {
                ...prevState.toBeDeletedReminders,
                ...getToBeDeletedReminders()
            }
        }));

        return null;
    }

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

    function getUnifiedReminderList(): Record<string, Reminder.Data>
    {
        const unifiedReminderList = {...reminders, ...state.toBeDeletedReminders};
        if (selectedReminder)
        {
            unifiedReminderList[selectedReminder.id] = selectedReminder.data;
        }

        return unifiedReminderList;
    }

    function getToBeDeletedReminders(): Record<string, Reminder.Data>
    {
        if (isNullOrUndefined(state.previousReminders))
        {
            return {};
        }

        const currentReminderIds = Object.keys(reminders);
        const toBeDeletedReminders: Record<string, Reminder.Data> = {};
        Object.keys(state.previousReminders)
            .filter(prevReminderId => !currentReminderIds.includes(prevReminderId))
            .forEach(prevReminderId => { toBeDeletedReminders[prevReminderId] = state.previousReminders[prevReminderId]; });

        return toBeDeletedReminders;
    }

    function getComputedDueDates(): Record<string, Date | undefined>
    {
        const computedDueDates: ReturnType<typeof getComputedDueDates> = {};
        Object.keys(reminders).forEach(reminderId =>
        {
            const reminder = reminders[reminderId];
            computedDueDates[reminderId] = Reminder.Service.getNextDueDate(reminder.recurrencePattern);
        });

        return computedDueDates;
    }

    function byDueDuration(reminderIdA: string, reminderIdB: string): number
    {
        const reminderA = reminders[reminderIdA] ?? unifiedReminderList[reminderIdA];
        const reminderB = reminders[reminderIdB] ?? unifiedReminderList[reminderIdB];

        const isDraft = (reminderId: string) => !reminderId;
        const isCompleted = (status: Reminder.Status) => status === Reminder.Status.Completed;
        const isSuspended = (status: Reminder.Status) => status === Reminder.Status.Suspended;

        const statusA = isDraft(reminderIdA) || isCompleted(reminderA.status) || isSuspended(reminderA.status) ? Infinity : 0;
        const statusB = isDraft(reminderIdB) || isCompleted(reminderB.status) || isSuspended(reminderB.status) ? Infinity : 0;
        const statusComparisonResult = statusA - statusB;
        if (statusComparisonResult !== 0)
        {
            return statusComparisonResult;
        }

        const dueDurationA = Reminder.Service.getDueDuration(today, reminderA.dueDate);
        const dueDurationB = Reminder.Service.getDueDuration(today, reminderB.dueDate);
        const dueDateComparisonResult = (dueDurationA ?? Infinity) - (dueDurationB ?? Infinity);
        if (dueDateComparisonResult !== 0)
        {
            return dueDateComparisonResult;
        }

        return isNotNullAndUndefined(reminderA.createdDate) && isNotNullAndUndefined(reminderB.createdDate)
            ? reminderA.createdDate.getTime() - reminderB.createdDate.getTime()
            : NaN;
    }

    function renderReminders(): JSX.Element[]
    {
        const sortedReminderIds = Object.keys(unifiedReminderList).sort(byDueDuration);
        return sortedReminderIds.map(sortedReminderId =>
        {
            const reminderMode = getReminderMode(sortedReminderId);
            const reminderData = unifiedReminderList[sortedReminderId];
            const isSelectedReminder = sortedReminderId === selectedReminder?.id;
            const isToBeDeletedReminder = !!state.toBeDeletedReminders[sortedReminderId];
            const computedDueDate = isSelectedReminder
                ? Reminder.Service.getNextDueDate(reminderData.recurrencePattern)
                : computedDueDates[sortedReminderId];

            return (
                <Reminder.Component
                    {...reminderData}
                    key={sortedReminderId}
                    id={sortedReminderId}
                    ref={ref => { remindersRef.current[sortedReminderId] = ref; }}
                    style={computedStyle.Reminder}
                    mode={reminderMode}
                    computedDueDate={computedDueDate}
                    isToBeDeleted={isToBeDeletedReminder}
                    maxSelectedTagCount={maxSelectedTagCount}
                    recurrencePatternPlaceholder={reminderRecurrencePatternPlaceholder}
                    notificationIntervalPlaceholder={reminderNotificationIntervalPlaceholder}
                    showProgressStripes={isSelectedReminder && selectedReminder?.showProgressStripes}
                    onPress={!selectedReminder ? () => { onSelectReminder?.(sortedReminderId); } : undefined}
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
});
