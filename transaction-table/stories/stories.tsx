import {EMPTY_STRING, Sb, withValidation} from "@miniskylab/antimatter-framework";
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
    render: args =>
    {
        const [, setArgs] = useArgs<TransactionTableProps>();
        return (
            <TransactionTableWithValidation
                {...args}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}
                onSwitchMode={newMode =>
                {
                    setArgs({
                        mode: newMode,
                        selectedTransaction: {
                            id: args.selectedTransaction.id,
                            data: newMode === TransactionRecord.Mode.Edit
                                ? {
                                    name: args.transactions[args.selectedTransaction.id].name,
                                    amount: args.transactions[args.selectedTransaction.id].amount,
                                    labels: args.transactions[args.selectedTransaction.id].labels,
                                    executedDate: args.transactions[args.selectedTransaction.id].executedDate,
                                    modifiedDate: args.transactions[args.selectedTransaction.id].modifiedDate,
                                    createdDate: args.transactions[args.selectedTransaction.id].createdDate
                                }
                                : undefined
                        }
                    });
                }}
                onChangeTransaction={newTransactionData =>
                {
                    setArgs({
                        selectedTransaction: {
                            id: args.selectedTransaction.id,
                            data: {
                                name: newTransactionData.name,
                                labels: newTransactionData.labels,
                                amount: newTransactionData.amount,
                                executedDate: newTransactionData.executedDate,
                                modifiedDate: newTransactionData.modifiedDate,
                                createdDate: newTransactionData.createdDate
                            }
                        }
                    });
                }}
                onSelectDate={newDate =>
                {
                    setArgs({
                        selectedDate: newDate,
                        selectedTransaction: undefined,
                        mode: TransactionRecord.Mode.ReadOnly,
                        transactions: TestData.getTransactionsByExecutionDate(newDate || new Date())
                    });
                }}
                onSelectTransaction={transactionId =>
                {
                    setArgs({
                        mode: TransactionRecord.Mode.Edit,
                        selectedTransaction: {
                            id: transactionId,
                            data: {
                                name: args.transactions[transactionId].name,
                                amount: args.transactions[transactionId].amount,
                                labels: args.transactions[transactionId].labels,
                                executedDate: args.transactions[transactionId].executedDate,
                                modifiedDate: args.transactions[transactionId].modifiedDate,
                                createdDate: args.transactions[transactionId].createdDate
                            }
                        }
                    });
                }}
                onAddNewTransaction={() =>
                {
                    setArgs({
                        mode: TransactionRecord.Mode.Draft,
                        selectedTransaction: {
                            id: EMPTY_STRING,
                            data: {
                                name: EMPTY_STRING,
                                labels: TestData.labels,
                                amount: 0,
                                executedDate: args.selectedDate,
                                modifiedDate: new Date(),
                                createdDate: new Date()
                            }
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
                            labels: args.selectedTransaction.data.labels,
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
                            labels: args.selectedTransaction.data.labels,
                            executedDate: args.selectedTransaction.data.executedDate,
                            modifiedDate: new Date(),
                            createdDate: args.selectedTransaction.data.createdDate
                        };
                    }

                    setArgs({
                        mode: TransactionRecord.Mode.ReadOnly,
                        selectedTransaction: undefined,
                        transactions: TestData.getTransactionsByExecutionDate(args.selectedDate)
                    });
                }}
                onDeleteTransaction={() =>
                {
                    delete TestData.transactions[args.selectedTransaction.id];
                    setArgs({
                        mode: TransactionRecord.Mode.ReadOnly,
                        selectedTransaction: undefined,
                        transactions: TestData.transactions
                    });
                }}
                onCancel={() =>
                {
                    setArgs({
                        mode: TransactionRecord.Mode.ReadOnly,
                        selectedTransaction: undefined
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
        selectedDate: today,
        transactions: TestData.getTransactionsByExecutionDate(today)
    }
};
