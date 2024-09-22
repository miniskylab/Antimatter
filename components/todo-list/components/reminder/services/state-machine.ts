import {ControlStatus, DueDateType, Mode, PendingStatus, Status} from "../enums";
import {getDueDate, getDueDuration} from "./recurrence-pattern";

export const StateMachine = new class
{
    private _today: Date;
    private _recurrencePattern: string | undefined;
    private _dueDate: Date | undefined;
    private _originalDueDate: Date | undefined;
    private _dueDuration: number | undefined;
    private _mode: Mode;
    private _status: Status;
    private _originalStatus: Status;
    private _pendingStatus: PendingStatus;
    private _undoControlStatus: ControlStatus;
    private _suspenseControlStatus: ControlStatus;
    private _rescheduleControlStatus: ControlStatus;

    constructor() { this.resetState(); }

    resetState(newState?: {
        today?: Date;
        recurrencePattern?: string,
        dueDate?: Date,
        originalDueDate?: Date,
        mode?: Mode,
        status?: Status,
        originalStatus?: Status,
        undoControlStatus?: ControlStatus,
        suspenseControlStatus?: ControlStatus,
        rescheduleControlStatus?: ControlStatus
    })
    {
        this._today = newState?.today ?? new Date();
        this._recurrencePattern = newState?.recurrencePattern;
        this._dueDate = newState?.dueDate;
        this._originalDueDate = newState?.originalDueDate;
        this._mode = newState?.mode ?? Mode.ReadOnly;
        this._status = newState?.status ?? Status.Unscheduled;
        this._originalStatus = newState?.originalStatus ?? Status.Unscheduled;
        this._undoControlStatus = newState?.undoControlStatus ?? ControlStatus.Available;
        this._suspenseControlStatus = newState?.suspenseControlStatus ?? ControlStatus.Available;
        this._rescheduleControlStatus = newState?.rescheduleControlStatus ?? ControlStatus.Available;

        this._pendingStatus = PendingStatus.None;
        this._dueDuration = getDueDuration(this._today, this._dueDate);
    }

    getState()
    {
        this._undoControlStatus = !this._originalDueDate
            ? ControlStatus.Hidden
            : this.isSuspended() || this.isCompleted() || this.isToBeRescheduled()
                ? ControlStatus.Disabled
                : this.isToBeUndone()
                    ? ControlStatus.Highlighted
                    : ControlStatus.Available;

        this._suspenseControlStatus = this.isToBeRescheduled() || this.isToBeUndone() || this.isCompleted()
            ? ControlStatus.Disabled
            : this.isSuspended()
                ? ControlStatus.Highlighted
                : ControlStatus.Available;

        this._rescheduleControlStatus = this._mode === Mode.Draft && this.isOriginallySuspended()
            ? ControlStatus.Hidden
            : this.isSuspended() || this.isToBeUndone()
                ? ControlStatus.Disabled
                : this.isToBeReactivated() || this.isToBeRescheduled() || this.isCompleted()
                    ? ControlStatus.Highlighted
                    : ControlStatus.Available;

        this._pendingStatus = this._pendingStatus !== PendingStatus.None
            ? this._pendingStatus
            : !this.isOriginallySuspended() && this.isScheduled() && (this.isDueDateRescheduledForward() || this.isDueDateReassigned())
                ? PendingStatus.ToBeRescheduled
                : !this.isOriginallySuspended() && this.isScheduled() && (this.isDueDateRescheduledBackward() || this.isDueDateUnassigned())
                    ? PendingStatus.ToBeUndone
                    : (this.isOriginallySuspended() || this.isOriginallyCompleted()) && this.isScheduled()
                        ? PendingStatus.ToBeReactivated
                        : PendingStatus.None;

        return {
            dueDate: this._dueDate,
            dueDuration: this._dueDuration,
            pendingStatus: this._pendingStatus,
            undoControlStatus: this._undoControlStatus,
            suspenseControlStatus: this._suspenseControlStatus,
            rescheduleControlStatus: this._rescheduleControlStatus
        };
    }

    toggleSuspense()
    {
        this._dueDate = this._originalDueDate;
        this._status = this._originalStatus ?? Status.Unscheduled;
        if (!this.isOriginallySuspended() && this._suspenseControlStatus === ControlStatus.Available)
        {
            this._suspenseControlStatus = ControlStatus.Highlighted;
            this._status = Status.Suspended;
            this._dueDate = undefined;
        }
        else if (this.isOriginallySuspended() && this._suspenseControlStatus === ControlStatus.Highlighted)
        {
            this._suspenseControlStatus = ControlStatus.Available;
            this.goToNextOccurrence();
        }
    }

    toggleReschedule()
    {
        this._dueDate = this._originalDueDate;
        this._status = this._originalStatus ?? Status.Unscheduled;
        if (this._rescheduleControlStatus === ControlStatus.Available)
        {
            this._rescheduleControlStatus = ControlStatus.Highlighted;
            this.goToNextOccurrence();
        }
    }

    toggleUndo()
    {
        this._dueDate = this._originalDueDate;
        this._status = this._originalStatus ?? Status.Unscheduled;
        if (this._undoControlStatus === ControlStatus.Available)
        {
            this._undoControlStatus = ControlStatus.Highlighted;
            this.goToPreviousOccurrence();
        }
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

    private isToBeReactivated() { return this._pendingStatus === PendingStatus.ToBeReactivated; }

    private isToBeRescheduled() { return this._pendingStatus === PendingStatus.ToBeRescheduled; }

    private isToBeUndone() { return this._pendingStatus === PendingStatus.ToBeUndone; }
};
