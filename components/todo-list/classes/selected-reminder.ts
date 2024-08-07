import {IsBoolean, IsDefined, IsString} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {Reminder} from "../components";

/**
 * Represents the selected reminder in the todo list.
 */
export class SelectedReminder
{
    /**
     * Specify the text that will be used to uniquely identify the selected reminder.
     */
    @IsString()
    @IsDefined()
    readonly id: string;


    /**
     * Specify the data of the selected reminder.
     *
     * @type Reminder.Data
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => Reminder.Data)
    readonly data: Reminder.Data;


    /**
     * Set this option to ***true*** to display the progress striped animation in the background of the selected reminder.
     */
    @IsBoolean()
    @IsOptional()
    readonly showProgressStripes?: boolean;
}
