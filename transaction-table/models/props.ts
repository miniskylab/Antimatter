import {ComponentName, ComponentProps, GestureResponderEventHandler, IsDate, IsEnum} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {Summary, TransactionRecord} from "../components";
import {ControlButton, Transaction} from "../types";
import {TransactionTableStyle} from "./style";

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
    readonly customActionButton?: ControlButton;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSwitchMode?: (newMode: TransactionRecord.Mode) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onChangeTransaction?: (newTransactionData: TransactionRecord.Data) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSelectTransaction?: (transactionId: string) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSelectDate?: (newDate: Date) => void;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onAddNewTransaction?: GestureResponderEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSaveTransaction?: GestureResponderEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onDeleteTransaction?: GestureResponderEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onCancel?: GestureResponderEventHandler;
}
