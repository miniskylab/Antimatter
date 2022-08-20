import {IsDate, IsDefined, IsEnum, IsNotEmpty, IsNumber, IsString} from "@miniskylab/antimatter-class-validator";
import {ComponentProps} from "@miniskylab/antimatter-model";
import {IsOptional} from "class-validator";
import {MouseEventHandler} from "react";
import {LabelData} from "./label-data";
import {Mode} from "./mode";
import {TransactionData} from "./transaction-data";

export class TransactionRecordProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    readonly name: string;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly labelSet?: Record<string, LabelData>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsString({each: true})
    @IsOptional()
    readonly labels?: string[];


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsNumber()
    @IsDefined()
    readonly amount: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDate()
    @IsDefined()
    readonly executedDate: Date;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDate()
    @IsDefined()
    readonly modifiedDate: Date;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type Mode
     */
    @IsEnum(Mode)
    @IsOptional()
    readonly mode?: Mode;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onClick?: MouseEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onChange?: (newTransactionData: TransactionData) => void;
}
