import {DateFormat, GregorianCalendar, isNotNullAndUndefined, isNullOrUndefined, TimeUnit} from "@miniskylab/antimatter-framework";
import {ControlStatus, DueDateType, Mode, PendingStatus, Status} from "../enums";
import {getDueDate, getDueDuration, isDurationBasedReminder} from "./recurrence-pattern";

export class StateMachine
{
    private readonly _today: Date;
    private readonly _mode: Mode;
    private readonly _originalStatus: Status;
    private readonly _originalDueDate: Date | undefined;
    private readonly _recurrencePattern: string | undefined;
    private _status: Status;
    private _dueDate: Date | undefined;
    private _suspenseToggleStatus: ControlStatus;
    private _rescheduleForwardToggleStatus: ControlStatus;
    private _rescheduleBackwardToggleStatus: ControlStatus;
    private _recurrencePatternInputFieldStatus: ControlStatus;

    constructor(initialState?: {
        today?: Date;
        recurrencePattern?: string,
        dueDate?: Date,
        originalDueDate?: Date,
        mode?: Mode,
        status?: Status,
        originalStatus?: Status
    })
    {
        this._today = initialState?.today ?? new Date();
        this._recurrencePattern = initialState?.recurrencePattern;
        this._originalDueDate = initialState?.originalDueDate;
        this._dueDate = initialState?.dueDate;
        this._mode = initialState?.mode ?? Mode.ReadOnly;
        this._status = initialState?.status ?? Status.Unscheduled;
        this._originalStatus = initialState?.originalStatus ?? Status.Unscheduled;

        this._suspenseToggleStatus = ControlStatus.Available;
        this._rescheduleForwardToggleStatus = ControlStatus.Available;
        this._rescheduleBackwardToggleStatus = ControlStatus.Available;
        this._recurrencePatternInputFieldStatus = ControlStatus.Available;
    }

    getDerivedProperties()
    {
        const isDraftOrEditMode = () => this._mode === Mode.Draft || this._mode === Mode.Edit;
        const isSelected = () => this._mode === Mode.Draft || this._mode === Mode.Edit || this._mode === Mode.Dismiss;

        const pendingStatus = !isSelected()
            ? PendingStatus.None
            : this.isOriginallyCompleted() && this.isScheduled()
                ? PendingStatus.ToBeUndone
                : this.isOriginallySuspended() && this.isScheduled()
                    ? PendingStatus.ToBeReactivated
                    : !this.isOriginallyCompleted() && this.isCompleted()
                        ? PendingStatus.ToBeCompleted
                        : !this.isOriginallySuspended() && this.isSuspended()
                            ? PendingStatus.ToBeSuspended
                            : !this.isOriginallySuspended() && this.isScheduled() &&
                              (this.isDueDateRescheduledBackward() || this.isDueDateUnassigned())
                                ? PendingStatus.ToBeRescheduledBackward
                                : !this.isOriginallySuspended() && this.isScheduled() &&
                                  (this.isDueDateRescheduledForward() || this.isDueDateReassigned())
                                    ? PendingStatus.ToBeRescheduledForward
                                    : PendingStatus.None;

        const isToBeReactivated = () => pendingStatus === PendingStatus.ToBeReactivated;
        const isToBeRescheduledForward = () => pendingStatus === PendingStatus.ToBeRescheduledForward;
        const isToBeRescheduledBackward = () => pendingStatus === PendingStatus.ToBeRescheduledBackward;

        this._recurrencePatternInputFieldStatus = !isDraftOrEditMode()
            ? ControlStatus.Hidden
            : ControlStatus.Available;

        this._suspenseToggleStatus = !isDraftOrEditMode() || this.isOriginallyCompleted()
            ? ControlStatus.Hidden
            : isToBeRescheduledForward() || isToBeRescheduledBackward() || this.isCompleted()
                ? ControlStatus.Disabled
                : this.isSuspended()
                    ? ControlStatus.Highlighted
                    : ControlStatus.Available;

        this._rescheduleForwardToggleStatus = this._mode === Mode.Draft || this.isOriginallySuspended()
            ? ControlStatus.Hidden
            : this.isSuspended() || isToBeRescheduledBackward()
                ? ControlStatus.Disabled
                : isToBeReactivated() || isToBeRescheduledForward() || this.isCompleted()
                    ? ControlStatus.Highlighted
                    : ControlStatus.Available;

        this._rescheduleBackwardToggleStatus = !this._originalDueDate || !isDraftOrEditMode()
            ? ControlStatus.Hidden
            : this.isSuspended() || this.isCompleted() || isToBeRescheduledForward()
                ? ControlStatus.Disabled
                : isToBeRescheduledBackward()
                    ? ControlStatus.Highlighted
                    : ControlStatus.Available;

        const dueDuration = getDueDuration(this._today, this._dueDate);
        const isOverdue = isNotNullAndUndefined(dueDuration) && dueDuration < 0;
        const isDue = dueDuration === 0;

        const formattedDueDate = this.isSuspended()
            ? "Suspended"
            : this.isCompleted()
                ? "Completed"
                : this._dueDate
                    ? GregorianCalendar.toString(this._dueDate, DateFormat.Short, TimeUnit.Day).replaceAll("/", ".")
                    : "No due date";

        const formattedDueDuration = this.isCompleted() || this.isSuspended() || isNullOrUndefined(dueDuration)
            ? undefined
            : isDue
                ? "Today"
                : dueDuration > 0
                    ? dueDuration === 1 ? "Tomorrow" : `In ${dueDuration} days`
                    : dueDuration === -1 ? "Yesterday" : `${Math.abs(dueDuration)} days ago`;

        return {
            isDue,
            isOverdue,
            dueDuration,
            pendingStatus,
            formattedDueDate,
            formattedDueDuration,
            suspenseToggleStatus: this._suspenseToggleStatus,
            rescheduleForwardToggleStatus: this._rescheduleForwardToggleStatus,
            rescheduleBackwardToggleStatus: this._rescheduleBackwardToggleStatus,
            recurrencePatternInputFieldStatus: this._recurrencePatternInputFieldStatus
        };
    }

    toggleSuspense(newSuspenseToggleStatus: ControlStatus.Available | ControlStatus.Highlighted): RescheduleResult
    {
        this._dueDate = this._originalDueDate;
        this._status = this._originalStatus ?? Status.Unscheduled;
        if (!this.isOriginallySuspended() && newSuspenseToggleStatus === ControlStatus.Highlighted)
        {
            this._status = Status.Suspended;
            this._dueDate = undefined;
        }
        else if (this.isOriginallySuspended() && newSuspenseToggleStatus === ControlStatus.Available)
        {
            this.goToNextOccurrence();
        }

        return {newDueDate: this._dueDate, newStatus: this._status};
    }

    toggleRescheduleForward(newRescheduleForwardToggleStatus: ControlStatus.Available | ControlStatus.Highlighted): RescheduleResult
    {
        this._dueDate = this._originalDueDate;
        this._status = this._originalStatus ?? Status.Unscheduled;
        if (
            (this.isOriginallyCompleted() && newRescheduleForwardToggleStatus === ControlStatus.Available) ||
            (!this.isOriginallyCompleted() && newRescheduleForwardToggleStatus === ControlStatus.Highlighted)
        )
        {
            this.goToNextOccurrence();
        }

        return {newDueDate: this._dueDate, newStatus: this._status};
    }

    toggleRescheduleBackward(newRescheduleBackwardToggleStatus: ControlStatus.Available | ControlStatus.Highlighted): RescheduleResult
    {
        this._dueDate = this._originalDueDate;
        this._status = this._originalStatus ?? Status.Unscheduled;
        if (newRescheduleBackwardToggleStatus === ControlStatus.Highlighted)
        {
            this.goToPreviousOccurrence();
        }

        return {newDueDate: this._dueDate, newStatus: this._status};
    }

    private goToNextOccurrence()
    {
        const today = this.isOriginallySuspended() || !this._dueDate || isDurationBasedReminder(this._recurrencePattern)
            ? this._today
            : this._dueDate;

        let newReminderStatus = Status.Scheduled;
        let newDueDate = getDueDate(this._recurrencePattern, DueDateType.NextDueDate, today);
        const isNewDueDateNotGreaterThanCurrentDueDate = !newDueDate || (!!this._dueDate && newDueDate <= this._dueDate);
        if (isNewDueDateNotGreaterThanCurrentDueDate)
        {
            newDueDate = undefined;
            newReminderStatus = this.isScheduled() ? Status.Completed : Status.Scheduled;
        }

        this._dueDate = newDueDate;
        this._status = newReminderStatus;
    }

    private goToPreviousOccurrence()
    {
        const today = !this._dueDate || isDurationBasedReminder(this._recurrencePattern)
            ? this._today
            : this._dueDate;

        let newDueDate = getDueDate(this._recurrencePattern, DueDateType.PreviousDueDate, today);
        const isNewDueDateNotLessThanCurrentDueDate = !newDueDate || (!!this._dueDate && newDueDate >= this._dueDate);
        if (isNewDueDateNotLessThanCurrentDueDate)
        {
            newDueDate = undefined;
        }

        this._dueDate = newDueDate;
        this._status = Status.Scheduled;
    }

    private isDueDateUnassigned() { return !!this._originalDueDate && !this._dueDate; }

    private isDueDateReassigned() { return !this._originalDueDate && !!this._dueDate; }

    private isDueDateRescheduledForward() { return !!this._originalDueDate && !!this._dueDate && this._dueDate > this._originalDueDate; }

    private isDueDateRescheduledBackward() { return !!this._originalDueDate && !!this._dueDate && this._dueDate < this._originalDueDate; }

    private isSuspended() { return this._status === Status.Suspended; }

    private isCompleted() { return this._status === Status.Completed; }

    private isScheduled() { return this._status === Status.Scheduled; }

    private isOriginallySuspended() { return this._originalStatus === Status.Suspended; }

    private isOriginallyCompleted() { return this._originalStatus === Status.Completed; }
}

type RescheduleResult = { newDueDate: Date | undefined, newStatus: Status };
