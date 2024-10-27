import {DataList, type DataListControlPanel} from "@miniskylab/antimatter-data-list";
import {
    type AllPropertiesMustPresent,
    EMPTY_STRING,
    isNotNullAndUndefined,
    isNullOrUndefined,
    MAX_NUMBER,
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
 * A component that alerts users of reminders they have inputted previously.
 */
export const TodoList = forwardRef(function TodoList(
    {
        style = Variant.Default,
        reminders = {},
        selectedReminder,
        alarmedReminderIds = [],
        reminderRecurrencePatternPlaceholder = EMPTY_STRING,
        reminderNotificationIntervalLabel = EMPTY_STRING,
        hourReminderNotificationIntervalPlaceholder = EMPTY_STRING,
        minuteReminderNotificationIntervalPlaceholder = EMPTY_STRING,
        secReminderNotificationIntervalPlaceholder = EMPTY_STRING,
        mode = Reminder.Mode.ReadOnly,
        maxSelectedTagCount = 2,
        displayPanel,
        dismissAllAlarmButton,
        saveAndDismissAlarmButton,
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
        style, reminderRecurrencePatternPlaceholder, reminderNotificationIntervalLabel, hourReminderNotificationIntervalPlaceholder,
        minuteReminderNotificationIntervalPlaceholder, secReminderNotificationIntervalPlaceholder, reminders, selectedReminder,
        alarmedReminderIds, mode, maxSelectedTagCount, displayPanel, dismissAllAlarmButton, saveAndDismissAlarmButton, addNewReminderButton,
        saveReminderButton, deleteReminderButton, cancelButton, customButton, onSwitchMode, onChangeReminder, onSelectReminder
    };

    const [state, setState] = useState<TodoListState>({
        toBeDeletedReminders: {},
        previousReminders: reminders
    });

    const toBeFlashHighlightedReminderIdsRef = useRef<string[]>([]);
    const remindersRef = useRef<Record<string, Nullable<Reminder.Ref>>>({});

    const today = new Date();
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
                if (playExitAnimation)
                {
                    playExitAnimation(onAnimationEnd);
                }
                else
                {
                    onAnimationEnd();
                }

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
            case Reminder.Mode.Alarm:
                return {
                    button1: {...dismissAllAlarmButton},
                    button2: {icon: DefaultIconSet.Alarm, text: "Alarm-Mode", disabled: true},
                    button3: {...cancelButton, disabled: true}
                };

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

            case Reminder.Mode.Dismiss:
                return {
                    button1: {...saveAndDismissAlarmButton},
                    button2: {icon: DefaultIconSet.NoSound, text: "Dismiss-Mode", disabled: true},
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
        return selectedReminder?.id === reminderId
            ? mode
            : alarmedReminderIds?.includes(reminderId)
                ? Reminder.Mode.Alarm
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

    function getStatusScore(reminderId: string, status: Reminder.Status)
    {
        if (!reminderId) return 3;
        if (status === Reminder.Status.Completed) return 2;
        if (status === Reminder.Status.Suspended) return 1;
        return 0;
    }

    function byDueDuration(reminderIdA: string, reminderIdB: string): number
    {
        const reminderA = reminders[reminderIdA] ?? unifiedReminderList[reminderIdA];
        const reminderB = reminders[reminderIdB] ?? unifiedReminderList[reminderIdB];

        const statusScoreA = getStatusScore(reminderIdA, reminderA.status);
        const statusScoreB = getStatusScore(reminderIdB, reminderB.status);
        const statusScoreComparisonResult = statusScoreA - statusScoreB;
        if (statusScoreComparisonResult !== 0)
        {
            return statusScoreComparisonResult;
        }

        const dueDurationA = Reminder.Service.getDueDuration(today, reminderA.dueDate);
        const dueDurationB = Reminder.Service.getDueDuration(today, reminderB.dueDate);
        const dueDateComparisonResult = (dueDurationA ?? MAX_NUMBER) - (dueDurationB ?? MAX_NUMBER);
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
            const originalData = isSelectedReminder ? reminders[sortedReminderId] : undefined;
            const isSelectableReminder = !selectedReminder && (mode === Reminder.Mode.ReadOnly || reminderMode === Reminder.Mode.Alarm);

            return (
                <Reminder.Component
                    {...reminderData}
                    key={sortedReminderId}
                    id={sortedReminderId}
                    ref={ref => { remindersRef.current[sortedReminderId] = ref; }}
                    style={computedStyle.Reminder}
                    mode={reminderMode}
                    originalData={originalData}
                    isToBeDeleted={isToBeDeletedReminder}
                    maxSelectedTagCount={maxSelectedTagCount}
                    recurrencePatternPlaceholder={reminderRecurrencePatternPlaceholder}
                    notificationIntervalLabel={reminderNotificationIntervalLabel}
                    hourNotificationIntervalPlaceholder={hourReminderNotificationIntervalPlaceholder}
                    minuteNotificationIntervalPlaceholder={minuteReminderNotificationIntervalPlaceholder}
                    secNotificationIntervalPlaceholder={secReminderNotificationIntervalPlaceholder}
                    showProgressStripes={isSelectedReminder && selectedReminder?.showProgressStripes}
                    onPress={isSelectableReminder ? () => { onSelectReminder?.(sortedReminderId); } : undefined}
                    onChange={newReminderData => { onChangeReminder?.({...reminderData, ...newReminderData}); }}
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
