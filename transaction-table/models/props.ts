import {ComponentName, ComponentProps, IsDate, IsEnum, IsInteger, IsNumber, IsPositive} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {DisplayPanel, SelectedTransaction} from "../classes";
import {Summary, TransactionRecord} from "../components";
import type {ControlButton, TransactionChangeData} from "../types";
import {type TransactionTableStyle} from "./style";

@ComponentName("Transaction Table")
export class TransactionTableProps extends ComponentProps<TransactionTableStyle>
{
    /**
     * <i style="color: #9B9B9B">(not available)</i>
     *
     * @type Summary.Props
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => Summary.Props)
    readonly summary?: Summary.Props;


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
    readonly transactions?: Record<string, TransactionRecord.Data>;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => SelectedTransaction)
    readonly selectedTransaction?: SelectedTransaction;


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
    @IsPositive()
    @IsInteger()
    @IsNumber()
    @IsOptional()
    readonly maxSelectedTagCount?: number;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => DisplayPanel)
    readonly displayPanel?: DisplayPanel;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly addNewTransactionButton: ControlButton;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly saveTransactionButton: ControlButton;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly deleteTransactionButton: ControlButton;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly cancelButton: ControlButton;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly customButton?: ControlButton;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSwitchMode?: (newMode: TransactionRecord.Mode) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onChangeTransaction?: (newTransactionData: TransactionChangeData) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSelectTransaction?: (transactionId: string) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSelectDate?: (newDate: Date) => void;
}
