import {Button} from "@miniskylab/antimatter-button";
import {Calendar} from "@miniskylab/antimatter-calendar";
import {DatePicker} from "@miniskylab/antimatter-date-picker";
import {
    AllPropertiesMustPresent,
    DateFormat,
    isNotNullAndUndefined,
    Ts,
    useBreakpoint,
    useComputedStyle
} from "@miniskylab/antimatter-framework";
import {ScrollView} from "@miniskylab/antimatter-scroll-view";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo, useState} from "react";
import {Summary, TransactionRecord} from "./components";
import {ControlButtonTypeContext, HrPositionContext, TransactionTableContext, TransactionTableProps, TransactionTableState} from "./models";
import {ControlPanel} from "./types";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function TransactionTable({
    style = Variant.Default,
    summary,
    transactions = {},
    selectedDate = new Date(),
    selectedTransaction,
    mode = TransactionRecord.Mode.ReadOnly,
    maxSelectedTagCount = 3,
    customButton,
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
    const props: AllPropertiesMustPresent<TransactionTableProps> = {
        style, summary, transactions, selectedDate, selectedTransaction, mode, maxSelectedTagCount, customButton, onChangeTransaction,
        onSelectDate, onSelectTransaction, onSwitchMode, onAddNewTransaction, onSaveTransaction, onDeleteTransaction, onCancel
    };

    const [state, setState] = useState<TransactionTableState>({
        datePickerIsOpened: false
    });

    const context = useMemo<TransactionTableContext>(
        () => ({props, state}),
        [...Object.values(props), ...Object.values(state)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const computedStyle = useComputedStyle(style, props, state);

    const ifViewportSizeIsGreaterThanOrEqualToLargeBreakpoint = useBreakpoint("Large");

    return (
        <TransactionTableContext.Provider value={context}>
            <View style={computedStyle.Root}>
                {renderDateSelectorAndSummary()}
                <View style={computedStyle.TransactionDetails}>
                    {renderControlPanel()}
                    <HrPositionContext.Provider value={"top"}>
                        <View style={computedStyle.Hr}/>
                    </HrPositionContext.Provider>
                    <ScrollView
                        style={computedStyle.TransactionContainer}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        {renderTransactions()}
                    </ScrollView>
                    <HrPositionContext.Provider value={"bottom"}>
                        <View style={computedStyle.Hr}/>
                    </HrPositionContext.Provider>
                </View>
            </View>
        </TransactionTableContext.Provider>
    );

    function getControlPanel(): ControlPanel
    {
        switch (mode)
        {
            case TransactionRecord.Mode.Draft:
                return {
                    pressButton1: {type: "action", icon: DefaultIconSet.FloppyDisk, text: "Save", onPress: onSaveTransaction},
                    switchButton: {type: "mode", icon: DefaultIconSet.Quill, text: "Draft-Mode"},
                    pressButton2: {type: "cancel", icon: DefaultIconSet.XMarkInsideCircle, text: "Cancel", onPress: onCancel}
                };

            case TransactionRecord.Mode.Edit:
                return {
                    pressButton1: {type: "action", icon: DefaultIconSet.FloppyDisk, text: "Save", onPress: onSaveTransaction},
                    switchButton: {type: "mode", icon: DefaultIconSet.Quill, text: "Edit-Mode", onPress: switchMode},
                    pressButton2: {type: "cancel", icon: DefaultIconSet.XMarkInsideCircle, text: "Cancel", onPress: onCancel}
                };

            case TransactionRecord.Mode.Delete:
                return {
                    pressButton1: {type: "action", icon: DefaultIconSet.TrashCan, text: "Delete", onPress: onDeleteTransaction},
                    switchButton: {type: "mode", icon: DefaultIconSet.Fire, text: "Delete-Mode", onPress: switchMode},
                    pressButton2: {type: "cancel", icon: DefaultIconSet.XMarkInsideCircle, text: "Cancel", onPress: onCancel}
                };

            default:
            case TransactionRecord.Mode.ReadOnly:
                return {
                    pressButton1: {type: "action", icon: DefaultIconSet.PlusCircle, text: "Add New", onPress: onAddNewTransaction},
                    switchButton: {type: "mode", icon: DefaultIconSet.Eye, text: "Read-Only"},
                    pressButton2: customButton
                        ? {type: "custom", ...customButton}
                        : {type: "cancel", icon: DefaultIconSet.XMarkInsideCircle, text: "Cancel"}
                };
        }
    }

    function getTransactionMode(transactionId: string): TransactionRecord.Mode
    {
        return transactionId === selectedTransaction?.id
            ? mode
            : TransactionRecord.Mode.ReadOnly;
    }

    function filterTransactionsForSelectedDate(): typeof transactions
    {
        const filteredTransactions: typeof transactions = {};
        Object.keys(transactions)
            .filter(transactionId => Ts.Date.isEqualDate(transactions[transactionId].executedDate, selectedDate))
            .forEach(transactionId => { filteredTransactions[transactionId] = transactions[transactionId]; });

        return filteredTransactions;
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

        return isNotNullAndUndefined(transactionA.createdDate) && isNotNullAndUndefined(transactionB.createdDate)
            ? transactionA.createdDate.getTime() - transactionB.createdDate.getTime()
            : NaN;
    }

    function renderSummary(): JSX.Element | undefined
    {
        return summary && (<Summary.Component style={computedStyle.Summary} {...summary}/>);
    }

    function renderDatePicker(): JSX.Element
    {
        return (
            <DatePicker
                style={computedStyle.DatePicker}
                selectedDate={selectedDate}
                dateFormat={DateFormat.Full}
                calendarIsOpen={state.datePickerIsOpened}
                onSelectedDateChange={newlySelectedDate =>
                {
                    setState(prevState => ({
                        ...prevState,
                        datePickerIsOpened: false
                    }));

                    newlySelectedDate && onSelectDate?.(newlySelectedDate);
                }}
                onAddonPress={() =>
                {
                    setState(prevState => ({
                        ...prevState,
                        datePickerIsOpened: !prevState.datePickerIsOpened
                    }));
                }}
            />
        );
    }

    function renderDateSelectorAndSummary(): JSX.Element
    {
        if (ifViewportSizeIsGreaterThanOrEqualToLargeBreakpoint)
        {
            return (<>
                {renderSummary()}
                <Calendar
                    style={computedStyle.Calendar}
                    selectedDate={selectedDate}
                    onSelectedDateChange={onSelectDate}
                />
            </>);
        }

        return (<>
            {renderDatePicker()}
            {renderSummary()}
        </>);
    }

    function renderControlPanel(): JSX.Element
    {
        const {pressButton1, switchButton, pressButton2} = getControlPanel();
        return (
            <View style={computedStyle.ControlPanel}>
                <ControlButtonTypeContext.Provider value={pressButton1.type}>
                    <Button
                        style={computedStyle.ControlButton}
                        icon={pressButton1.icon}
                        label={pressButton1.text}
                        disabled={!pressButton1.onPress}
                        onPress={pressButton1.onPress}
                    />
                </ControlButtonTypeContext.Provider>
                <ControlButtonTypeContext.Provider value={switchButton.type}>
                    <Button
                        style={computedStyle.ControlButton}
                        icon={switchButton.icon}
                        label={switchButton.text}
                        disabled={!switchButton.onPress}
                        onPress={switchButton.onPress}
                    />
                </ControlButtonTypeContext.Provider>
                <ControlButtonTypeContext.Provider value={pressButton2.type}>
                    <Button
                        style={computedStyle.ControlButton}
                        icon={pressButton2.icon}
                        label={pressButton2.text}
                        disabled={!pressButton2.onPress}
                        onPress={pressButton2.onPress}
                    />
                </ControlButtonTypeContext.Provider>
            </View>
        );
    }

    function renderTransactions(): JSX.Element[]
    {
        const filteredTransactions = filterTransactionsForSelectedDate();
        const filteredTransactionIds = Object.keys(filteredTransactions).sort(byDate);
        if (mode === TransactionRecord.Mode.Draft && selectedTransaction)
        {
            filteredTransactionIds.push(selectedTransaction.id);
        }

        return filteredTransactionIds.map(filteredTransactionId =>
        {
            const transactionMode = getTransactionMode(filteredTransactionId);
            const transactionData = selectedTransaction &&
                                    (
                                        transactionMode === TransactionRecord.Mode.Edit
                                        ||
                                        transactionMode === TransactionRecord.Mode.Draft
                                    )
                ? selectedTransaction.data
                : filteredTransactions[filteredTransactionId];

            return (
                <TransactionRecord.Component
                    {...transactionData}
                    key={filteredTransactionId}
                    id={filteredTransactionId}
                    style={computedStyle.TransactionRecord}
                    mode={transactionMode}
                    tags={transactionData?.tags}
                    maxSelectedTagCount={maxSelectedTagCount}
                    onPress={mode === TransactionRecord.Mode.ReadOnly ? () => { onSelectTransaction?.(filteredTransactionId); } : undefined}
                    onChange={newTransactionData => { onChangeTransaction?.(newTransactionData); }}
                />
            );
        });
    }

    function switchMode(): void
    {
        switch (mode)
        {
            case TransactionRecord.Mode.ReadOnly:
                onSwitchMode?.(TransactionRecord.Mode.Draft);
                break;

            case TransactionRecord.Mode.Edit:
                onSwitchMode?.(TransactionRecord.Mode.Delete);
                break;

            case TransactionRecord.Mode.Delete:
                onSwitchMode?.(TransactionRecord.Mode.Edit);
                break;

            default:
                throw new Error(`No valid mode to switch to from mode "${Ts.Enum.getName(TransactionRecord.Mode, mode)}"`);
        }
    }
}
