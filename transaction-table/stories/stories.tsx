import {EMPTY_STRING, Sb, withValidation} from "@miniskylab/antimatter-framework";
import {useArgs} from "@storybook/preview-api";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {TransactionRecord} from "../components";
import {TransactionTable} from "../main";
import {TransactionTableProps} from "../models";
import * as Service from "../services";
import * as Variant from "../variants";
import {TestData} from "./test-data";

const TransactionTableWithValidation = withValidation(TransactionTable, TransactionTableProps);
export default {
    component: TransactionTable,
    title: "Components/Transaction Table",
    render: args =>
    {
        const [, setArgs] = useArgs<TransactionTableProps>();
        return (
            <TransactionTableWithValidation
                {...args}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}
                onSwitchMode={newMode =>
                {
                    const selectedTransaction: TransactionTableProps["selectedTransaction"] = {
                        id: args.selectedTransaction.id,
                        data: newMode === TransactionRecord.Mode.Edit
                            ? {
                                name: args.transactions[args.selectedTransaction.id].name,
                                amount: args.transactions[args.selectedTransaction.id].amount,
                                tags: args.transactions[args.selectedTransaction.id].tags,
                                executedDate: args.transactions[args.selectedTransaction.id].executedDate,
                                modifiedDate: args.transactions[args.selectedTransaction.id].modifiedDate,
                                createdDate: args.transactions[args.selectedTransaction.id].createdDate
                            }
                            : undefined
                    };

                    setArgs({
                        mode: newMode,
                        selectedTransaction,
                        summary: {
                            ...args.summary,
                            ...Service.getDefaultSummaryFigures(args.transactions, args.selectedDate, selectedTransaction)
                        }
                    });
                }}
                onChangeTransaction={newTransactionData =>
                {
                    const selectedTransaction: TransactionTableProps["selectedTransaction"] = {
                        id: args.selectedTransaction.id,
                        data: {
                            name: newTransactionData.name,
                            tags: newTransactionData.tags,
                            amount: newTransactionData.amount,
                            executedDate: newTransactionData.executedDate,
                            modifiedDate: newTransactionData.modifiedDate,
                            createdDate: newTransactionData.createdDate
                        }
                    };

                    setArgs({
                        selectedTransaction,
                        summary: {
                            ...args.summary,
                            ...Service.getDefaultSummaryFigures(args.transactions, args.selectedDate, selectedTransaction)
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
                            ...Service.getDefaultSummaryFigures(args.transactions, newDate)
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
                            ...Service.getDefaultSummaryFigures(args.transactions, args.selectedDate, selectedTransaction)
                        }
                    });
                }}
                onAddNewTransaction={() =>
                {
                    const selectedTransaction: TransactionTableProps["selectedTransaction"] = {
                        id: EMPTY_STRING,
                        data: {
                            name: EMPTY_STRING,
                            tags: TestData.tags,
                            amount: 0,
                            executedDate: args.selectedDate,
                            modifiedDate: new Date(),
                            createdDate: new Date()
                        }
                    };

                    setArgs({
                        mode: TransactionRecord.Mode.Draft,
                        selectedTransaction,
                        summary: {
                            ...args.summary,
                            ...Service.getDefaultSummaryFigures(args.transactions, args.selectedDate, selectedTransaction)
                        }
                    });
                }}
                onSaveTransaction={() =>
                {
                    if (args.selectedTransaction.id === EMPTY_STRING)
                    {
                        TestData.transactions[`${Date.now()}`] = {
                            name: args.selectedTransaction.data.name,
                            amount: args.selectedTransaction.data.amount,
                            tags: args.selectedTransaction.data.tags,
                            executedDate: args.selectedTransaction.data.executedDate,
                            modifiedDate: new Date(),
                            createdDate: args.selectedTransaction.data.createdDate
                        };
                    }
                    else
                    {
                        TestData.transactions[args.selectedTransaction.id] = {
                            ...args.transactions[args.selectedTransaction.id],
                            name: args.selectedTransaction.data.name,
                            amount: args.selectedTransaction.data.amount,
                            tags: args.selectedTransaction.data.tags,
                            executedDate: args.selectedTransaction.data.executedDate,
                            modifiedDate: new Date(),
                            createdDate: args.selectedTransaction.data.createdDate
                        };
                    }

                    setArgs({
                        mode: TransactionRecord.Mode.ReadOnly,
                        selectedTransaction: undefined,
                        summary: {
                            ...args.summary,
                            ...Service.getDefaultSummaryFigures(args.transactions, args.selectedDate)
                        }
                    });
                }}
                onDeleteTransaction={() =>
                {
                    delete TestData.transactions[args.selectedTransaction.id];
                    setArgs({
                        mode: TransactionRecord.Mode.ReadOnly,
                        selectedTransaction: undefined,
                        summary: {
                            ...args.summary,
                            ...Service.getDefaultSummaryFigures(args.transactions, args.selectedDate)
                        }
                    });
                }}
                onCancel={() =>
                {
                    setArgs({
                        mode: TransactionRecord.Mode.ReadOnly,
                        selectedTransaction: undefined,
                        summary: {
                            ...args.summary,
                            ...Service.getDefaultSummaryFigures(args.transactions, args.selectedDate)
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
        onChangeTransaction: Sb.locked,
        onSelectDate: Sb.locked,
        onSelectTransaction: Sb.locked,
        onAddNewTransaction: Sb.locked,
        onSaveTransaction: Sb.locked,
        onDeleteTransaction: Sb.locked,
        onSwitchMode: Sb.locked,
        onCancel: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        summary: {
            section1Label: "Iaculis",
            section2Label: "Lorem",
            ...Service.getDefaultSummaryFigures(TestData.transactions, today)
        },
        title: "Lorem Ipsum",
        subtitle: "Aenean condimentum maximus ligula porttitor",
        selectedDate: today,
        transactions: TestData.transactions
    }
};
