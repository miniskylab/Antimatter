import {IsBoolean, IsDate, IsDefined} from "@miniskylab/antimatter-framework";

/**
 * Represents a single month in a year.
 */
export class MonthInfo
{
    /**
     * Specify the month value.
     */
    @IsDate()
    @IsDefined()
    readonly value: Date;


    /**
     * Set the option to ***true*** to specify that this month doesn't belong to the displaying year.
     */
    @IsBoolean()
    @IsDefined()
    readonly isExtraneous: boolean;
}
