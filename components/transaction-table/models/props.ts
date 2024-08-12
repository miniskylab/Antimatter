import {DataListControlButton, DataListDisplayPanel} from "@miniskylab/antimatter-data-list";
import {ComponentName, ComponentProps, IsDate, IsDefined, IsEnum, IsInteger, IsNumber, IsPositive} from "@miniskylab/antimatter-framework";
import {Type} from "class-transformer";
import {IsOptional, ValidateNested} from "class-validator";
import {SelectedTransaction} from "../classes";
import {Summary, TransactionRecord} from "../components";
import type {TransactionChangeData} from "../types";
import {type TransactionTableStyle} from "./style";

@ComponentName("Transaction Table")
export class TransactionTableProps extends ComponentProps<TransactionTableStyle>
{
    /**
     * Specify what will be displayed in the summary section of the transaction table.
     *
     * @type Summary
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => Summary.Props)
    readonly summary?: Summary.Props;


    /**
     * Specify the selected date. The transaction table might contain many transactions but only transactions in the selected date will be
     * displayed and can be modified or deleted. Newly added transactions will automatically belong to the selected date.
     */
    @IsDate()
    @IsOptional()
    readonly selectedDate?: Date;


    /**
     * Specify all transactions that are managed by the transaction table.
     */
    @IsOptional()
    readonly transactions?: Record<string, TransactionRecord.Data>;


    /**
     * Specify the selected transaction. Only the selected transaction can be modified, saved or deleted.
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => SelectedTransaction)
    readonly selectedTransaction?: SelectedTransaction;


    /**
     * Specify the way the transaction table operates or behaves.
     *
     * @type TransactionRecord.Mode
     */
    @IsEnum(TransactionRecord.Mode)
    @IsOptional()
    readonly mode?: TransactionRecord.Mode;


    /**
     * Specify the maximum number of tags that can be assigned to a single transaction.
     */
    @IsPositive()
    @IsInteger()
    @IsNumber()
    @IsOptional()
    readonly maxSelectedTagCount?: number;


    /**
     * This option is used to convey temporary messages to users.
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => DataListDisplayPanel)
    readonly displayPanel?: DataListDisplayPanel;


    /**
     * Specify the button that users can press to add a new transaction to the table.
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => DataListControlButton)
    readonly addNewTransactionButton: DataListControlButton;


    /**
     * Specify the button that users can press to save all changes made to the selected transaction.
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => DataListControlButton)
    readonly saveTransactionButton: DataListControlButton;


    /**
     * Specify the button that users can press to delete the selected transaction from the table.
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => DataListControlButton)
    readonly deleteTransactionButton: DataListControlButton;


    /**
     * Specify the button that users can press to discard all changes made to the selected transaction.
     */
    @IsDefined()
    @ValidateNested()
    @Type(() => DataListControlButton)
    readonly cancelButton: DataListControlButton;


    /**
     * Specify the button that users can press to trigger custom functionalities.
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => DataListControlButton)
    readonly customButton?: DataListControlButton;


    /**
     * Specify the piece of code that will be executed when the transaction table changes mode.
     */
    readonly onSwitchMode?: (newMode: TransactionRecord.Mode) => void;


    /**
     * Specify the piece of code that will be executed when data of the selected transaction changes.
     */
    readonly onChangeTransaction?: (newTransactionData: TransactionChangeData) => void;


    /**
     * Specify the piece of code that will be executed when a transaction is selected.
     */
    readonly onSelectTransaction?: (transactionId: string) => void;


    /**
     * Specify the piece of code that will be executed when the selected date changes.
     */
    readonly onSelectDate?: (newDate: Date) => void;
}
