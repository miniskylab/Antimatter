import {IsBoolean, IsDefined, IsString} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {TransactionRecord} from "../components";

/**
 * Represents the selected transaction in the transaction table.
 */
export class SelectedTransaction
{
    /**
     * Specify the text that will be used to uniquely identify the selected transaction.
     */
    @IsString()
    @IsDefined()
    readonly id: string;


    /**
     * Specify the data of the selected transaction.
     *
     * @type TransactionRecord.Data
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => TransactionRecord.Data)
    readonly data: TransactionRecord.Data;


    /**
     * Set this option to ***true*** to display the progress striped animation in the background of the selected transaction.
     */
    @IsBoolean()
    @IsOptional()
    readonly showProgressStripes?: boolean;
}
