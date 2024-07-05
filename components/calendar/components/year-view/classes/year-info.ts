import {IsBoolean, IsDefined, IsNumber} from "@miniskylab/antimatter-framework";

/**
 * Represents a single year in a decade.
 */
export class YearInfo
{
    /**
     * Specify the year value.
     */
    @IsNumber()
    @IsDefined()
    readonly value: number;


    /**
     * Set the option to ***true*** to specify that this year doesn't belong to the displaying decade.
     */
    @IsBoolean()
    @IsDefined()
    readonly isExtraneous: boolean;
}
