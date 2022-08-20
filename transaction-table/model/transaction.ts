import {IsDefined, IsString} from "@miniskylab/antimatter-class-validator";
import {IsOptional} from "class-validator";
import {TransactionRecord} from "../components";

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
