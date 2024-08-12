import {IsBoolean, IsDate, IsDefined} from "@miniskylab/antimatter-framework";

export class MonthInfo
{
    @IsDate()
    @IsDefined()
    readonly value: Date;


    @IsBoolean()
    @IsDefined()
    readonly isExtraneous: boolean;
}
