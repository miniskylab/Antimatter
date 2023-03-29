import {IsBoolean, IsDefined, IsNumber} from "@miniskylab/antimatter-framework";

export class YearInfo
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNumber()
    @IsDefined()
    readonly value: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsDefined()
    readonly isExtraneous: boolean;
}
