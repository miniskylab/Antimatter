import {IsBoolean, IsDefined, IsNumber} from "@miniskylab/antimatter-framework";

export class YearInfo
{
    @IsNumber()
    @IsDefined()
    readonly value: number;


    @IsBoolean()
    @IsDefined()
    readonly isExtraneous: boolean;
}
