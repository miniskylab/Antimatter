import {DataListControlButton, DataListDisplayPanel} from "@miniskylab/antimatter-data-list";
import {
    ComponentName,
    ComponentProps,
    IsDefined,
    IsEnum,
    IsInteger,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString
} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {SelectedReminder} from "../classes";
import {Reminder} from "../components";
import type {ReminderChangeData} from "../types";
import {type TodoListStyle} from "./style";

@ComponentName("Todo List")
export class TodoListProps extends ComponentProps<TodoListStyle>
{
    /**
     * Specify all reminders that are managed by the todo list.
     */
    @IsOptional()
    readonly reminders?: Record<string, Reminder.Data>;


    /**
     * Specify the selected reminder. Only the selected reminder can be modified, saved or deleted.
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => SelectedReminder)
    readonly selectedReminder?: SelectedReminder;


    /**
     * Specify the text that will be displayed before the reminder recurrence pattern has been entered.
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly reminderRecurrencePatternPlaceholder?: string;


    /**
     * Specify the text that will be displayed before the reminder notification interval has been entered.
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly reminderNotificationIntervalPlaceholder?: string;


    /**
     * Specify the way the todo list operates or behaves.
     *
     * @type Reminder.Mode
     */
    @IsEnum(Reminder.Mode)
    @IsOptional()
    readonly mode?: Reminder.Mode;


    /**
     * Specify the maximum number of tags that can be assigned to a single reminder.
     */
    @IsPositive()
    @IsInteger()
    @IsNumber()
    @IsOptional()
    readonly maxSelectedTagCount?: number;


    /**
     * This option is used to convey temporary messages to users.
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => DataListDisplayPanel)
    readonly displayPanel?: DataListDisplayPanel;


    /**
     * Specify the button that users can press to add a new reminder to the todo list.
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => DataListControlButton)
    readonly addNewReminderButton: DataListControlButton;


    /**
     * Specify the button that users can press to save all changes made to the selected reminder.
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => DataListControlButton)
    readonly saveReminderButton: DataListControlButton;


    /**
     * Specify the button that users can press to delete the selected reminder from the todo list.
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => DataListControlButton)
    readonly deleteReminderButton: DataListControlButton;


    /**
     * Specify the button that users can press to discard all changes made to the selected reminder.
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => DataListControlButton)
    readonly cancelButton: DataListControlButton;


    /**
     * Specify the button that users can press to trigger custom functionalities.
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => DataListControlButton)
    readonly customButton?: DataListControlButton;


    /**
     * Specify the piece of code that will be executed when the todo list changes mode.
     */
    readonly onSwitchMode?: (newMode: Reminder.Mode) => void;


    /**
     * Specify the piece of code that will be executed when data of the selected reminder changes.
     */
    readonly onChangeReminder?: (newReminderData: ReminderChangeData) => void;


    /**
     * Specify the piece of code that will be executed when a reminder is selected.
     */
    readonly onSelectReminder?: (reminderId: string) => void;
}
