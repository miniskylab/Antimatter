import {ComponentName, ComponentProps, GestureResponderEventHandler, IsDate, IsEnum} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {TransactionRecord} from "../component";
import {Transaction} from "../type";
import {TransactionTableStyle} from "./style";

@ComponentName("Transaction Table")
export class TransactionTableProps extends ComponentProps<TransactionTableStyle>
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
    readonly onAddNewTransaction: GestureResponderEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onSaveTransaction: GestureResponderEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onDeleteTransaction: GestureResponderEventHandler;


    /**
     * <i style="color: #9B9B9B">(not available)</i>
     */
    readonly onCancel: GestureResponderEventHandler;
}
