import {IsBoolean, IsDate, IsDefined} from "@miniskylab/antimatter-framework";

export class DateInfo
{
    @IsDate()
    @IsDefined()
    readonly value: Date;


    @IsBoolean()
    @IsDefined()
    readonly isExtraneous: boolean;
}
