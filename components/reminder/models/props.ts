import {ComponentName, ComponentProps, IsEnum, IsInteger, IsNumber, IsPositive} from "@miniskylab/antimatter-framework";
import {DataListDisplayPanel, DataListOperationMode, DataListProps} from "@miniskylab/data-list";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {SelectedReminderItem} from "../classes";
import {ReminderItem} from "../components";
import type {ReminderItemChangeData} from "../types";
import {type ReminderStyle} from "./style";

@ComponentName("Reminder")
export class ReminderProps extends ComponentProps<ReminderStyle>
{
    /**
     * Specify all items that are managed by the reminder.
     */
    @IsOptional()
    readonly reminderItems?: Record<string, ReminderItem.Data>;


    /**
     * Specify the selected reminder item. Only the selected reminder item can be modified, saved or deleted.
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => SelectedReminderItem)
    readonly selectedReminderItem?: SelectedReminderItem;


    /**
     * Specify the way the reminder operates or behaves.
     *
     * @type DataListOperationMode
     */
    @IsEnum(DataListOperationMode)
    @IsOptional()
    readonly mode?: DataListOperationMode;


    /**
     * Specify the maximum number of tags that can be assigned to a single reminder item.
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
     * Specify the button that users can press to add a new item to the reminder.
     */
    readonly addNewReminderItemButton: DataListProps["addNewButton"];


    /**
     * Specify the button that users can press to save all changes made to the selected reminder item.
     */
    readonly saveReminderItemButton: DataListProps["saveButton"];


    /**
     * Specify the button that users can press to delete the selected item from the reminder.
     */
    readonly deleteReminderItemButton: DataListProps["deleteButton"];


    /**
     * Specify the button that users can press to discard all changes made to the selected reminder item.
     */
    readonly cancelButton: DataListProps["cancelButton"];


    /**
     * Specify the button that users can press to trigger custom functionalities.
     */
    readonly customButton?: DataListProps["customButton"];


    /**
     * Specify the piece of code that will be executed when the reminder changes mode.
     */
    readonly onSwitchMode?: (newMode: DataListOperationMode) => void;


    /**
     * Specify the piece of code that will be executed when data of the selected reminder item changes.
     */
    readonly onChangeReminderItem?: (newReminderItemData: ReminderItemChangeData) => void;


    /**
     * Specify the piece of code that will be executed when a reminder item is selected.
     */
    readonly onSelectReminderItem?: (reminderItemId: string) => void;
}
