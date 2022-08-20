import {Button} from "@miniskylab/antimatter-button";
import {Calendar} from "@miniskylab/antimatter-calendar";
import {DatePicker} from "@miniskylab/antimatter-date-picker";
import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
import {Label} from "@miniskylab/antimatter-label";
import {Enum} from "@miniskylab/antimatter-typescript";
import React from "react";
import {TransactionRecord} from "./components";
import {IControlButton, IControlPanel, TransactionTableProps} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function TransactionTable({
    className,
    labelSet = {},
    transactions = {},
    selectedDate = new Date(),
    selectedTransaction,
    mode = TransactionRecord.Mode.ReadOnly,
    onChangeTransaction,
    onSelectDate,
    onSelectTransaction,
    onAddNewTransaction,
    onSaveTransaction,
    onDeleteTransaction,
    onSwitchMode,
    onCancel
}: TransactionTableProps): JSX.Element
{
    const {modeButton, actionButton, cancelButton} = getControlPanelModel();
    return (
        <div className={className}>
            {renderDateSelector()}
            <div className={`${className}__transaction-details`}>
                {renderControlPanel()}
                <div className={`${className}__transaction-container`}>
                    <div className={`${className}__transaction-scroll`}>
                        <div className={`${className}__hr--top`}/>
                        {renderTransactions()}
                        {mode !== TransactionRecord.Mode.Draft && renderAddNewButton()}
                        <div className={`${className}__hr--bottom`}/>
                    </div>
                </div>
                {renderSummary()}
            </div>
        </div>
    );

    function getControlPanelModel(): IControlPanel
    {
        switch (mode)
        {
            case TransactionRecord.Mode.Draft:
                return {
                    modeButton: {modifier: "--draft", icon: Icomoon.Quill, text: "Draft-Mode"},
                    actionButton: {modifier: "--edit", icon: Icomoon.FloppyDisk, text: "Save", onClick: onSaveTransaction},
                    cancelButton: {modifier: String.EMPTY, icon: Icomoon.XMarkInsideCircle, text: "Cancel", onClick: onCancel}
                };

            case TransactionRecord.Mode.Edit:
                return {
                    modeButton: {modifier: "--edit", icon: Icomoon.Quill, text: "Edit-Mode", onClick: switchMode},
                    actionButton: {modifier: "--edit", icon: Icomoon.FloppyDisk, text: "Save", onClick: onSaveTransaction},
                    cancelButton: {modifier: String.EMPTY, icon: Icomoon.XMarkInsideCircle, text: "Cancel", onClick: onCancel}
                };

            case TransactionRecord.Mode.Delete:
                return {
                    modeButton: {modifier: "--delete", icon: Icomoon.Fire, text: "Delete-Mode", onClick: switchMode},
                    actionButton: {modifier: "--delete", icon: Icomoon.TrashCan, text: "Delete", onClick: onDeleteTransaction},
                    cancelButton: {modifier: String.EMPTY, icon: Icomoon.XMarkInsideCircle, text: "Cancel", onClick: onCancel}
                };

            default:
            case TransactionRecord.Mode.ReadOnly:
                return {
                    modeButton: {modifier: "--disabled", icon: Icomoon.Eye, text: "Read-Only"},
                    actionButton: {modifier: "--disabled", icon: Icomoon.FloppyDisk, text: "Save"},
                    cancelButton: {modifier: "--disabled", icon: Icomoon.XMarkInsideCircle, text: "Cancel"}
                };
        }
    }

    function getAddNewButtonModel(): IControlButton
    {
        switch (mode)
        {
            case TransactionRecord.Mode.ReadOnly:
                return {modifier: String.EMPTY, icon: Icomoon.PlusCircle, onClick: onAddNewTransaction};

            default:
                return {modifier: "--disabled", icon: Icomoon.NotAllowed};
        }
    }

    function getTransactionMode(transactionId: string): TransactionRecord.Mode
    {
        return transactionId === selectedTransaction?.id
            ? mode
            : TransactionRecord.Mode.ReadOnly;
    }

    function getTotalIncome(): number
    {
        return Object.values(transactions)
            .reduce((totalIncome, transaction) =>
            {
                if (transaction.labels?.some(labelId => labelSet[labelId].isIncome))
                {
                    totalIncome += transaction.amount;
                }

                return totalIncome;
            }, 0);
    }

    function getTotalExpense(): number
    {
        return Object.values(transactions)
            .reduce((totalExpense, transaction) =>
            {
                if (transaction.labels?.every(labelId => !labelSet[labelId].isIncome))
                {
                    totalExpense += transaction.amount;
                }

                return totalExpense;
            }, 0);
    }

    function byDate(transactionIdA: string, transactionIdB: string): number
    {
        const transactionA = transactions[transactionIdA];
        const transactionB = transactions[transactionIdB];

        const executedDateComparisonResult = transactionA.executedDate.getTime() - transactionB.executedDate.getTime();
        if (executedDateComparisonResult !== 0)
        {
            return executedDateComparisonResult;
        }

        return transactionA.modifiedDate.getTime() - transactionB.modifiedDate.getTime();
    }

    function renderDateSelector(): JSX.Element
    {
        return (
            <>
                <div className={`${className}__calendar-container`}>
                    <Calendar
                        className={`${className}__calendar`}
                        selectedDate={selectedDate}
                        onChange={onSelectDate}
                    />
                </div>
                <div className={`${className}__date-picker-container`}>
                    <DatePicker
                        key={selectedDate.getTime()}
                        className={`${className}__date-picker`}
                        defaultSelectedDate={selectedDate}
                        disableTyping={true}
                        onChange={onSelectDate}
                    />
                </div>
            </>
        );
    }

    function renderControlPanel(): JSX.Element
    {
        return (
            <div className={`${className}__control-panel`}>
                <Button
                    className={`${className}__control-button${actionButton.modifier}`}
                    icon={actionButton.icon}
                    label={actionButton.text}
                    onClick={actionButton.onClick}
                />
                <Button
                    className={`${className}__control-button${modeButton.modifier}`}
                    icon={modeButton.icon}
                    label={modeButton.text}
                    onClick={modeButton.onClick}
                />
                <Button
                    className={`${className}__control-button${cancelButton.modifier}`}
                    icon={cancelButton.icon}
                    label={cancelButton.text}
                    onClick={cancelButton.onClick}
                />
            </div>
        );
    }

    function renderTransactions(): JSX.Element[]
    {
        const transactionIds = Object.keys(transactions).sort(byDate);
        if (mode === TransactionRecord.Mode.Draft && selectedTransaction)
        {
            transactionIds.push(selectedTransaction.id);
        }

        return transactionIds.map(transactionId =>
        {
            const transactionMode = getTransactionMode(transactionId);
            const transactionData = transactionMode === TransactionRecord.Mode.Edit
                                    ||
                                    transactionMode === TransactionRecord.Mode.Draft
                ? selectedTransaction.data
                : transactions[transactionId];

            return (
                <TransactionRecord.Component
                    key={transactionId}
                    className={`${className}__transaction-record`}
                    name={transactionData.name}
                    labelSet={labelSet}
                    labels={transactionData.labels}
                    executedDate={transactionData.executedDate}
                    modifiedDate={transactionData.modifiedDate}
                    amount={transactionData.amount}
                    mode={transactionMode}
                    onClick={mode === TransactionRecord.Mode.ReadOnly ? () => { onSelectTransaction(transactionId); } : undefined}
                    onChange={newTransactionData => { onChangeTransaction(newTransactionData); }}
                />
            );
        });
    }

    function renderAddNewButton(): JSX.Element
    {
        const addNewButton = getAddNewButtonModel();
        return (
            <Button
                className={`${className}__add-new-button${addNewButton.modifier}`}
                icon={addNewButton.icon}
                onClick={addNewButton.onClick}
            />
        );
    }

    function renderSummary(): JSX.Element
    {
        return (
            <div className={`${className}__summary`}>
                <div className={`${className}__summary-record`}>
                    <Label className={`${className}__summary-text`} text={"TOTAL EXPENSES:"}/>
                    <Label className={`${className}__summary-amount--expenses`} text={getTotalExpense().toLocaleString()}/>
                </div>
                <div className={`${className}__summary-record`}>
                    <Label className={`${className}__summary-text`} text={"TOTAL INCOME:"}/>
                    <Label className={`${className}__summary-amount--income`} text={getTotalIncome().toLocaleString()}/>
                </div>
            </div>
        );
    }

    function switchMode(): void
    {
        switch (mode)
        {
            case TransactionRecord.Mode.ReadOnly:
                onSwitchMode(TransactionRecord.Mode.Draft);
                break;

            case TransactionRecord.Mode.Edit:
                onSwitchMode(TransactionRecord.Mode.Delete);
                break;

            case TransactionRecord.Mode.Delete:
                onSwitchMode(TransactionRecord.Mode.Edit);
                break;

            default:
                throw new Error(`No valid mode to switch to from mode "${Enum.getName(TransactionRecord.Mode, mode)}"`);
        }
    }
}
