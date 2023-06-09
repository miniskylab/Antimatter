import {IsDefined, IsEnum, IsNotEmpty, IsPositive, IsString} from "@miniskylab/antimatter-framework";
import {IsOptional} from "class-validator";
import {TransactionLabelStatus, TransactionLabelType} from "../enum";

export class TransactionLabel
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    readonly name: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly icon?: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsPositive()
    @IsOptional()
    readonly order?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type TransactionLabelStatus
     */
    @IsEnum(TransactionLabelStatus)
    @IsOptional()
    readonly status?: TransactionLabelStatus;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type TransactionLabelType
     */
    @IsEnum(TransactionLabelType)
    @IsOptional()
    readonly type?: TransactionLabelType;
}
