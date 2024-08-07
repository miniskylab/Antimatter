import {ComponentName, ComponentProps, IsEnum, IsInteger, IsNumber, IsPositive} from "@miniskylab/antimatter-framework";
import {DataListDisplayPanel, DataListOperationMode, DataListProps} from "@miniskylab/data-list";
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
     * Specify the way the todo list operates or behaves.
     *
     * @type DataListOperationMode
     */
    @IsEnum(DataListOperationMode)
    @IsOptional()
    readonly mode?: DataListOperationMode;


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
    readonly addNewReminderButton: DataListProps["addNewButton"];


    /**
     * Specify the button that users can press to save all changes made to the selected reminder.
     */
    readonly saveReminderButton: DataListProps["saveButton"];


    /**
     * Specify the button that users can press to delete the selected reminder from the todo list.
     */
    readonly deleteReminderButton: DataListProps["deleteButton"];


    /**
     * Specify the button that users can press to discard all changes made to the selected reminder.
     */
    readonly cancelButton: DataListProps["cancelButton"];


    /**
     * Specify the button that users can press to trigger custom functionalities.
     */
    readonly customButton?: DataListProps["customButton"];


    /**
     * Specify the piece of code that will be executed when the todo list changes mode.
     */
    readonly onSwitchMode?: (newMode: DataListOperationMode) => void;


    /**
     * Specify the piece of code that will be executed when data of the selected reminder changes.
     */
    readonly onChangeReminder?: (newReminderData: ReminderChangeData) => void;


    /**
     * Specify the piece of code that will be executed when a reminder is selected.
     */
    readonly onSelectReminder?: (reminderId: string) => void;
}
