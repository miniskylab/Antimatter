import {IsBoolean, IsDefined, IsString} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {ReminderItem} from "../components";

/**
 * Represents the selected item in the reminder.
 */
export class SelectedReminderItem
{
    /**
     * Specify the text that will be used to uniquely identify the selected reminder item.
     */
    @IsString()
    @IsDefined()
    readonly id: string;


    /**
     * Specify the data of the selected reminder item.
     *
     * @type ReminderItem.Data
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => ReminderItem.Data)
    readonly data: ReminderItem.Data;


    /**
     * Set this option to ***true*** to display the progress striped animation in the background of the selected reminder item.
     */
    @IsBoolean()
    @IsOptional()
    readonly showProgressStripes?: boolean;
}
