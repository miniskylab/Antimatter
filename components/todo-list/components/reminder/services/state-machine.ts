import {DateFormat, GregorianCalendar, isNotNullAndUndefined, isNullOrUndefined, TimeUnit} from "@miniskylab/antimatter-framework";
import {ControlStatus, DueDateType, Mode, PendingStatus, Status} from "../enums";
import {getDueDate, getDueDuration} from "./recurrence-pattern";

export class StateMachine
{
    private readonly _today: Date;
    private readonly _mode: Mode;
    private readonly _recurrencePattern: string | undefined;
    private readonly _originalDueDate: Date | undefined;
    private readonly _originalStatus: Status;
    private _status: Status;
    private _dueDate: Date | undefined;
    private _undoControlStatus: ControlStatus;
    private _suspenseControlStatus: ControlStatus;
    private _rescheduleControlStatus: ControlStatus;

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

        this._undoControlStatus = ControlStatus.Available;
        this._suspenseControlStatus = ControlStatus.Available;
        this._rescheduleControlStatus = ControlStatus.Available;
    }

    getDerivedProperties()
    {
        const pendingStatus = (this.isOriginallySuspended() || this.isOriginallyCompleted()) && this.isScheduled()
            ? PendingStatus.ToBeReactivated
            : !this.isOriginallySuspended() && this.isScheduled() && (this.isDueDateRescheduledBackward() || this.isDueDateUnassigned())
                ? PendingStatus.ToBeUndone
                : !this.isOriginallySuspended() && this.isScheduled() && (this.isDueDateRescheduledForward() || this.isDueDateReassigned())
                    ? PendingStatus.ToBeRescheduled
                    : PendingStatus.None;

        function isToBeUndone() { return pendingStatus === PendingStatus.ToBeUndone; }
        function isToBeReactivated() { return pendingStatus === PendingStatus.ToBeReactivated; }
        function isToBeRescheduled() { return pendingStatus === PendingStatus.ToBeRescheduled; }

        this._undoControlStatus = !this._originalDueDate
            ? ControlStatus.Hidden
            : this.isSuspended() || this.isCompleted() || isToBeRescheduled()
                ? ControlStatus.Disabled
                : isToBeUndone()
                    ? ControlStatus.Highlighted
                    : ControlStatus.Available;

        this._suspenseControlStatus = this._mode === Mode.ReadOnly
            ? ControlStatus.Hidden
            : isToBeRescheduled() || isToBeUndone() || this.isCompleted()
                ? ControlStatus.Disabled
                : this.isSuspended()
                    ? ControlStatus.Highlighted
                    : ControlStatus.Available;

        this._rescheduleControlStatus = this._mode === Mode.Draft && this.isOriginallySuspended()
            ? ControlStatus.Hidden
            : this.isSuspended() || isToBeUndone()
                ? ControlStatus.Disabled
                : isToBeReactivated() || isToBeRescheduled() || this.isCompleted()
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
            undoControlStatus: this._undoControlStatus,
            suspenseControlStatus: this._suspenseControlStatus,
            rescheduleControlStatus: this._rescheduleControlStatus
        };
    }

    toggleSuspense(newSuspenseControlStatus: ControlStatus.Available | ControlStatus.Highlighted): RescheduleResult
    {
        this._dueDate = this._originalDueDate;
        this._status = this._originalStatus ?? Status.Unscheduled;
        if (!this.isOriginallySuspended() && newSuspenseControlStatus === ControlStatus.Highlighted)
        {
            this._suspenseControlStatus = newSuspenseControlStatus;
            this._status = Status.Suspended;
            this._dueDate = undefined;
        }
        else if (this.isOriginallySuspended() && newSuspenseControlStatus === ControlStatus.Available)
        {
            this._suspenseControlStatus = newSuspenseControlStatus;
            this.goToNextOccurrence();
        }

        return {newDueDate: this._dueDate, newStatus: this._status};
    }

    toggleReschedule(newRescheduleControlStatus: ControlStatus.Available | ControlStatus.Highlighted): RescheduleResult
    {
        this._dueDate = this._originalDueDate;
        this._status = this._originalStatus ?? Status.Unscheduled;
        if (newRescheduleControlStatus === ControlStatus.Highlighted)
        {
            this._rescheduleControlStatus = newRescheduleControlStatus;
            this.goToNextOccurrence();
        }

        return {newDueDate: this._dueDate, newStatus: this._status};
    }

    toggleUndo(newUndoControlStatus: ControlStatus.Available | ControlStatus.Highlighted): RescheduleResult
    {
        this._dueDate = this._originalDueDate;
        this._status = this._originalStatus ?? Status.Unscheduled;
        if (newUndoControlStatus === ControlStatus.Highlighted)
        {
            this._undoControlStatus = newUndoControlStatus;
            this.goToPreviousOccurrence();
        }

        return {newDueDate: this._dueDate, newStatus: this._status};
    }

    private goToNextOccurrence()
    {
        let newReminderStatus = Status.Scheduled;
        let newDueDate = getDueDate(this._recurrencePattern, DueDateType.NextDueDate, this._dueDate ?? this._today);
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
        let newDueDate = getDueDate(this._recurrencePattern, DueDateType.PreviousDueDate, this._dueDate ?? this._today);
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
