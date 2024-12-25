import {IsDefined, IsString} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {ValidateNested} from "class-validator";
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
}
