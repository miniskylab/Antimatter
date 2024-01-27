import {EMPTY_STRING, Sb, withValidation} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {useArgs} from "@storybook/preview-api";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {TransactionRecord} from "../components";
import {TransactionTable} from "../main";
import {TransactionTableProps} from "../models";
import * as Variant from "../variants";
import {TestData} from "./test-data";

const TransactionTableWithValidation = withValidation(TransactionTable, TransactionTableProps);
export default {
    component: TransactionTable,
    title: "Components/Transaction Table",
    render: (args: Required<TransactionTableProps>) =>
    {
        const [, setArgs] = useArgs<TransactionTableProps>();
        return (
            <TransactionTableWithValidation
                {...args}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}
                addNewTransactionButton={{
                    icon: DefaultIconSet.PlusCircle,
                    text: "Add New",
                    onPress: () =>
                    {
                        const selectedTransaction: TransactionTableProps["selectedTransaction"] = {
                            id: EMPTY_STRING,
                            data: {
                                name: EMPTY_STRING,
                                tags: TestData.tags,
                                amount: 0,
                                executedDate: args.selectedDate
                            }
                        };

                        setArgs({
                            mode: TransactionRecord.Mode.Draft,
                            selectedTransaction,
                            summary: {
                                ...args.summary,
                                ...TestData.getSummaryFigures(args.selectedDate, selectedTransaction)
                            }
                        });
                    }
                }}
                saveTransactionButton={{
                    icon: DefaultIconSet.FloppyDisk,
                    text: "Save",
                    onPress: () =>
                    {
                        if (args.selectedTransaction.id === EMPTY_STRING)
                        {
                            args.transactions[`${Date.now()}`] = {
                                name: args.selectedTransaction.data.name,
                                amount: args.selectedTransaction.data.amount,
                                tags: args.selectedTransaction.data.tags,
                                executedDate: args.selectedTransaction.data.executedDate,
                                createdDate: new Date()
                            };
                        }
                        else
                        {
                            args.transactions[args.selectedTransaction.id] = {
                                ...args.transactions[args.selectedTransaction.id],
                                name: args.selectedTransaction.data.name,
                                amount: args.selectedTransaction.data.amount,
                                tags: args.selectedTransaction.data.tags,
                                executedDate: args.selectedTransaction.data.executedDate,
                                modifiedDate: new Date()
                            };
                        }

                        setArgs({
                            mode: TransactionRecord.Mode.ReadOnly,
                            selectedTransaction: undefined,
                            summary: {
                                ...args.summary,
                                ...TestData.getSummaryFigures(args.selectedDate)
                            }
                        });
                    }
                }}
                deleteTransactionButton={{
                    icon: DefaultIconSet.TrashCan,
                    text: "Delete",
                    onPress: () =>
                    {
                        delete args.transactions[args.selectedTransaction.id];
                        setArgs({
                            mode: TransactionRecord.Mode.ReadOnly,
                            selectedTransaction: undefined,
                            summary: {
                                ...args.summary,
                                ...TestData.getSummaryFigures(args.selectedDate)
                            }
                        });
                    }
                }}
                cancelButton={{
                    icon: DefaultIconSet.XMarkInsideCircle,
                    text: "Cancel",
                    onPress: () =>
                    {
                        setArgs({
                            mode: TransactionRecord.Mode.ReadOnly,
                            selectedTransaction: undefined,
                            summary: {
                                ...args.summary,
                                ...TestData.getSummaryFigures(args.selectedDate)
                            }
                        });
                    }
                }}
                customButton={{
                    icon: DefaultIconSet.Group,
                    text: "Lorem Ipsum: 99",
                    onPress: () => { alert("Lorem Ipsum"); }
                }}
                onSwitchMode={newMode =>
                {
                    const selectedTransaction: TransactionTableProps["selectedTransaction"] = {
                        id: args.selectedTransaction.id,
                        data: {
                            name: args.transactions[args.selectedTransaction.id].name,
                            amount: args.transactions[args.selectedTransaction.id].amount,
                            tags: args.transactions[args.selectedTransaction.id].tags,
                            executedDate: args.transactions[args.selectedTransaction.id].executedDate,
                            modifiedDate: args.transactions[args.selectedTransaction.id].modifiedDate,
                            createdDate: args.transactions[args.selectedTransaction.id].createdDate
                        }
                    };

                    setArgs({
                        mode: newMode,
                        selectedTransaction,
                        summary: {
                            ...args.summary,
                            ...TestData.getSummaryFigures(args.selectedDate, selectedTransaction)
                        }
                    });
                }}
                onChangeTransaction={newTransactionData =>
                {
                    const selectedTransaction: TransactionTableProps["selectedTransaction"] = {
                        id: args.selectedTransaction.id,
                        data: {
                            ...args.selectedTransaction.data,
                            ...newTransactionData
                        }
                    };

                    setArgs({
                        selectedTransaction,
                        summary: {
                            ...args.summary,
                            ...TestData.getSummaryFigures(args.selectedDate, selectedTransaction)
                        }
                    });
                }}
                onSelectDate={newDate =>
                {
                    setArgs({
                        selectedDate: newDate,
                        selectedTransaction: undefined,
                        mode: TransactionRecord.Mode.ReadOnly,
                        summary: {
                            ...args.summary,
                            ...TestData.getSummaryFigures(newDate)
                        }
                    });
                }}
                onSelectTransaction={transactionId =>
                {
                    const selectedTransaction: TransactionTableProps["selectedTransaction"] = {
                        id: transactionId,
                        data: {
                            name: args.transactions[transactionId].name,
                            amount: args.transactions[transactionId].amount,
                            tags: args.transactions[transactionId].tags,
                            executedDate: args.transactions[transactionId].executedDate,
                            modifiedDate: args.transactions[transactionId].modifiedDate,
                            createdDate: args.transactions[transactionId].createdDate
                        }
                    };

                    setArgs({
                        mode: TransactionRecord.Mode.Edit,
                        selectedTransaction,
                        summary: {
                            ...args.summary,
                            ...TestData.getSummaryFigures(args.selectedDate, selectedTransaction)
                        }
                    });
                }}
            />
        );
    }
} satisfies Meta<typeof TransactionTable>;
type Story = StoryObj<typeof TransactionTable>;

const today = new Date();
export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        summary: Sb.locked,
        transactions: Sb.locked,
        selectedDate: Sb.locked,
        selectedTransaction: Sb.locked,
        mode: Sb.locked,
        addNewTransactionButton: Sb.locked,
        saveTransactionButton: Sb.locked,
        deleteTransactionButton: Sb.locked,
        cancelButton: Sb.locked,
        customButton: Sb.locked,
        onChangeTransaction: Sb.locked,
        onSelectDate: Sb.locked,
        onSelectTransaction: Sb.locked,
        onSwitchMode: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        summary: {
            section1Label: "Iaculis",
            section2Label: "Lorem",
            ...TestData.getSummaryFigures(today)
        },
        selectedDate: today,
        maxSelectedTagCount: 3,
        transactions: TestData.transactions
    }
};
