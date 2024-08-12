import {IsBoolean, IsDefined, IsString} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {Reminder} from "../components";

export class SelectedReminder
{
    @IsString()
    @IsDefined()
    readonly id: string;


    @IsDefined()
    @ValidateNested()
    @Type(() => Reminder.Data)
    readonly data: Reminder.Data;


    @IsBoolean()
    @IsOptional()
    readonly showProgressStripes?: boolean;
}
