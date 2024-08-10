import {Calendar} from "@miniskylab/antimatter-calendar";
import {DataList, type DataListControlPanel} from "@miniskylab/antimatter-data-list";
import {DatePicker} from "@miniskylab/antimatter-date-picker";
import {
    type AllPropertiesMustPresent,
    DateFormat,
    isNotNullAndUndefined,
    isNullOrUndefined,
    type Nullable,
    Ts,
    useBreakpoint,
    useComputedStyle
} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {forwardRef, JSX, MutableRefObject, useEffect, useImperativeHandle, useMemo, useRef, useState} from "react";
import {Easing} from "react-native";
import {Summary, TransactionRecord} from "./components";
import {TransactionTableContext, TransactionTableProps, type TransactionTableRef, type TransactionTableState} from "./models";
import * as Variant from "./variants";

/**
 * A component for managing personal financial transactions.
 */
export const TransactionTable = forwardRef(function TransactionTable(
    {
        style = Variant.Default,
        summary,
        transactions = {},
        selectedDate = new Date(),
        selectedTransaction,
        mode = TransactionRecord.Mode.ReadOnly,
        maxSelectedTagCount = 3,
        displayPanel,
        addNewTransactionButton,
        saveTransactionButton,
        deleteTransactionButton,
        cancelButton,
        customButton,
        onChangeTransaction,
        onSelectDate,
        onSelectTransaction,
        onSwitchMode
    }: TransactionTableProps,
    ref: MutableRefObject<TransactionTableRef>
): JSX.Element | null
{
    const props: AllPropertiesMustPresent<TransactionTableProps> = {
        style, summary, transactions, selectedDate, selectedTransaction, mode, maxSelectedTagCount, displayPanel, customButton,
        addNewTransactionButton, saveTransactionButton, deleteTransactionButton, cancelButton, onChangeTransaction, onSelectDate,
        onSelectTransaction, onSwitchMode
    };

    const [state, setState] = useState<TransactionTableState>({
        datePickerIsOpened: false,
        toBeDeletedTransactions: {},
        previousTransactions: transactions
    });

    const context = useMemo<TransactionTableContext>(
        () => ({props, state}),
        [...Object.values(props), ...Object.values(state)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props, state);

    const toBeFlashHighlightedTransactionIdsRef = useRef<string[]>([]);
    const transactionRecordsRef = useRef<Record<string, Nullable<TransactionRecord.Ref>>>({});

    const {button1, button2, button3} = useMemo(
        () => getControlPanel(),
        [mode, addNewTransactionButton, saveTransactionButton, deleteTransactionButton, cancelButton, customButton]
    );
    const unifiedTransactionList = useMemo(
        () => getUnifiedTransactionList(),
        [transactions, selectedTransaction, state.toBeDeletedTransactions]
    );
    const filteredTransactions = useMemo(
        () => filterTransactionsForSelectedDate(),
        [unifiedTransactionList, selectedDate]
    );

    useImperativeHandle(ref, () => ({
        flashHighlightTransactions(transactionIds) { toBeFlashHighlightedTransactionIdsRef.current = [...transactionIds]; }
    }), []);

    useEffect(() =>
    {
        const transactionIds = Object.keys(transactions);
        Object.keys(transactionRecordsRef)
            .filter(x => !transactionIds.includes(x))
            .forEach(x => { delete transactionRecordsRef.current[x]; });
    }, [transactions]);

    useEffect(() =>
    {
        let transactionId = toBeFlashHighlightedTransactionIdsRef.current.pop();
        while (transactionId)
        {
            transactionRecordsRef.current[transactionId]?.flashHighlight?.();
            transactionId = toBeFlashHighlightedTransactionIdsRef.current.pop();
        }
    }, [toBeFlashHighlightedTransactionIdsRef.current]);

    useEffect(() =>
    {
        Object.keys(state.toBeDeletedTransactions)
            .forEach(toBeDeletedTransactionId =>
            {
                const playExitAnimation = transactionRecordsRef.current[toBeDeletedTransactionId]?.animateHeightTo;
                playExitAnimation ? playExitAnimation(2, Easing.out(Easing.circle), 2000, 0, onAnimationEnd) : onAnimationEnd();

                function onAnimationEnd()
                {
                    setState(prevState =>
                    {
                        const nextToBeDeletedTransactions = {...prevState.toBeDeletedTransactions};
                        delete nextToBeDeletedTransactions[toBeDeletedTransactionId];

                        return {...prevState, toBeDeletedTransactions: nextToBeDeletedTransactions};
                    });
                }
            });
    }, [state.toBeDeletedTransactions]);

    if (transactions !== state.previousTransactions)
    {
        setState(prevState => ({
            ...prevState,
            previousTransactions: transactions,
            toBeDeletedTransactions: {
                ...prevState.toBeDeletedTransactions,
                ...getToBeDeletedTransactions()
            }
        }));

        return null;
    }

    return (
        <TransactionTableContext.Provider value={context}>
            <View style={computedStyle.Root}>
                {renderDateSelectorAndSummary()}
                <DataList
                    style={computedStyle.TransactionList}
                    displayPanel={displayPanel}
                    button1={button1}
                    button2={button2}
                    button3={button3}
                >
                    {renderTransactions()}
                </DataList>
            </View>
        </TransactionTableContext.Provider>
    );

    function getControlPanel(): DataListControlPanel
    {
        switch (mode)
        {
            case TransactionRecord.Mode.Draft:
                return {
                    button1: {...saveTransactionButton},
                    button2: {icon: DefaultIconSet.Quill, text: "Draft-Mode", disabled: true},
                    button3: {...cancelButton}
                };

            case TransactionRecord.Mode.Edit:
                return {
                    button1: {...saveTransactionButton},
                    button2: {icon: DefaultIconSet.Quill, text: "Edit-Mode", onPress: switchMode},
                    button3: {...cancelButton}
                };

            case TransactionRecord.Mode.Delete:
                return {
                    button1: {...deleteTransactionButton},
                    button2: {icon: DefaultIconSet.Fire, text: "Delete-Mode", onPress: switchMode},
                    button3: {...cancelButton}
                };

            default:
            case TransactionRecord.Mode.ReadOnly:
                return {
                    button1: {...addNewTransactionButton},
                    button2: {icon: DefaultIconSet.Eye, text: "Read-Only", disabled: true},
                    button3: customButton ? {...customButton} : {...cancelButton, disabled: true}
                };
        }
    }

    function getTransactionMode(transactionId: string): TransactionRecord.Mode
    {
        return transactionId === selectedTransaction?.id
            ? mode
            : TransactionRecord.Mode.ReadOnly;
    }

    function getUnifiedTransactionList(): Record<string, TransactionRecord.Data>
    {
        const unifiedTransactionList = {...transactions, ...state.toBeDeletedTransactions};
        if (selectedTransaction)
        {
            unifiedTransactionList[selectedTransaction.id] = selectedTransaction.data;
        }

        return unifiedTransactionList;
    }

    function getToBeDeletedTransactions(): Record<string, TransactionRecord.Data>
    {
        if (isNullOrUndefined(state.previousTransactions))
        {
            return {};
        }

        const currentTransactionIds = Object.keys(transactions);
        const toBeDeletedTransactions: Record<string, TransactionRecord.Data> = {};
        Object.keys(state.previousTransactions)
            .filter(prevTransactionId => !currentTransactionIds.includes(prevTransactionId))
            .forEach(prevTransactionId => { toBeDeletedTransactions[prevTransactionId] = state.previousTransactions[prevTransactionId]; });

        return toBeDeletedTransactions;
    }

    function filterTransactionsForSelectedDate(): Record<string, TransactionRecord.Data>
    {
        const filteredTransactions: Record<string, TransactionRecord.Data> = {};
        Object.keys(unifiedTransactionList)
            .filter(transactionId => Ts.Date.isEqualDate(unifiedTransactionList[transactionId].executedDate, selectedDate))
            .forEach(transactionId => { filteredTransactions[transactionId] = unifiedTransactionList[transactionId]; });

        return filteredTransactions;
    }

    function byDate(transactionIdA: string, transactionIdB: string): number
    {
        const transactionA = unifiedTransactionList[transactionIdA];
        const transactionB = unifiedTransactionList[transactionIdB];

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
                isCalendarOpen={state.datePickerIsOpened}
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
        const ifViewportSizeIsGreaterThanOrEqualToLargeBreakpoint = useBreakpoint("Large");
        if (ifViewportSizeIsGreaterThanOrEqualToLargeBreakpoint)
        {
            return (<>
                {renderSummary()}
                <Calendar
                    style={computedStyle.Calendar}
                    selectedDate={selectedDate}
                    onSelectedDateChange={newlySelectedDate => { newlySelectedDate && onSelectDate?.(newlySelectedDate); }}
                />
            </>);
        }

        return (<>
            {renderDatePicker()}
            {renderSummary()}
        </>);
    }

    function renderTransactions(): JSX.Element[]
    {
        const filteredTransactionIds = Object.keys(filteredTransactions).sort(byDate);
        return filteredTransactionIds.map(filteredTransactionId =>
        {
            const transactionMode = getTransactionMode(filteredTransactionId);
            const transactionData = filteredTransactions[filteredTransactionId];
            const isSelectedTransaction = filteredTransactionId === selectedTransaction?.id;
            const isToBeDeletedTransaction = !!state.toBeDeletedTransactions[filteredTransactionId];

            return (
                <TransactionRecord.Component
                    {...transactionData}
                    key={filteredTransactionId}
                    id={filteredTransactionId}
                    ref={ref => { transactionRecordsRef.current[filteredTransactionId] = ref; }}
                    style={computedStyle.TransactionRecord}
                    mode={transactionMode}
                    tags={transactionData?.tags}
                    maxSelectedTagCount={maxSelectedTagCount}
                    showProgressStripes={isSelectedTransaction && selectedTransaction?.showProgressStripes}
                    toBeDeleted={isToBeDeletedTransaction}
                    onPress={!selectedTransaction ? () => { onSelectTransaction?.(filteredTransactionId); } : undefined}
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
});
