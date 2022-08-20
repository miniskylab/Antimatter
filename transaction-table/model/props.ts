import {IsDate, IsEnum} from "@miniskylab/antimatter-class-validator";
import {ComponentName, ComponentProps} from "@miniskylab/antimatter-model";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {MouseEventHandler} from "react";
import {TransactionRecord} from "../components";
import {Transaction} from "./transaction";

@ComponentName("Transaction Table")
export class TransactionTableProps extends ComponentProps
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsDate()
    @IsOptional()
    readonly selectedDate?: Date;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly labelSet?: Record<string, TransactionRecord.LabelData>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    readonly transactions?: Record<string, TransactionRecord.TransactionData>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => Transaction)
    readonly selectedTransaction?: Transaction;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type TransactionRecord.Mode
     */
    @IsEnum(TransactionRecord.Mode)
    @IsOptional()
    readonly mode?: TransactionRecord.Mode;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSwitchMode: (newMode: TransactionRecord.Mode) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onChangeTransaction: (newTransactionData: TransactionRecord.TransactionData) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSelectTransaction: (transactionId: string) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSelectDate: (newDate: Date) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onAddNewTransaction: MouseEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSaveTransaction: MouseEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onDeleteTransaction: MouseEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onCancel: MouseEventHandler;
}
