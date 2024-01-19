import {IsDefined, IsString} from "@miniskylab/antimatter-framework";
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
    @IsDefined()
    readonly data: TransactionRecord.Data;
}
