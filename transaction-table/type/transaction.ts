import {IsDefined, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {TransactionRecord} from "../component";

export class Transaction
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsDefined()
    readonly id: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly data?: TransactionRecord.TransactionData;
}