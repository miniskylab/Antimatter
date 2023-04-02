import {IsBoolean, IsDate, IsDefined} from "@miniskylab/antimatter-framework";

export class MonthInfo
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDate()
    @IsDefined()
    readonly value: Date;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsDefined()
    readonly isExtraneous: boolean;
}
