import {IsBoolean, IsDefined, IsString} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {TransactionRecord} from "../components";

export class SelectedTransaction
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsDefined()
    readonly id: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type TransactionRecord.Data
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => TransactionRecord.Data)
    readonly data: TransactionRecord.Data;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsBoolean()
    @IsOptional()
    readonly showProgressStripes?: boolean;
}
