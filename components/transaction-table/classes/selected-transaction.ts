import {IsBoolean, IsDefined, IsString} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {TransactionRecord} from "../components";

export class SelectedTransaction
{
    @IsString()
    @IsDefined()
    readonly id: string;


    @IsDefined()
    @ValidateNested()
    @Type(() => TransactionRecord.Data)
    readonly data: TransactionRecord.Data;


    @IsBoolean()
    @IsOptional()
    readonly showProgressStripes?: boolean;
}
