import {IsBoolean, IsDate, IsDefined} from "@miniskylab/antimatter-framework";

/**
 * Represents a single date in a month.
 */
export class DateInfo
{
    /**
     * Specify the date value.
     */
    @IsDate()
    @IsDefined()
    readonly value: Date;


    /**
     * Set the option to ***true*** to specify that this date doesn't belong to the displaying month.
     */
    @IsBoolean()
    @IsDefined()
    readonly isExtraneous: boolean;
}
