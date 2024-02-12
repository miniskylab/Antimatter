import {EMPTY_STRING, Sb, withValidation} from "@miniskylab/antimatter-framework";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {useArgs} from "@storybook/preview-api";
import type {Meta, StoryObj} from "@storybook/react";
import React, {useRef} from "react";
import {TransactionRecord} from "../components";
import {DisplayPanelTheme} from "../enums";
import {TransactionTable} from "../main";
import {TransactionTableProps, TransactionTableRef} from "../models";
import {getExecutedDateFrom} from "../services";
import * as Variant from "../variants";
import {TestData} from "./test-data";

const TransactionTableWithValidation = withValidation(TransactionTable, TransactionTableProps);
export default {
    component: TransactionTable,
    title: "Components/Transaction Table",
    render: (args: Required<TransactionTableProps>) =>
    {
        type BusySettings = Pick<TransactionTableProps, "selectedTransaction" | "addNewTransactionButton" | "saveTransactionButton" |
            "deleteTransactionButton" | "cancelButton" | "customButton">;

        type UnbusySettings = Pick<TransactionTableProps, "addNewTransactionButton" | "saveTransactionButton" | "deleteTransactionButton" |
            "cancelButton" | "customButton">;

        const busySettings: BusySettings = {
            selectedTransaction: {
                ...args.selectedTransaction,
                showProgressStripes: true
            },
            addNewTransactionButton: {
                ...args.addNewTransactionButton,
                disabled: true
            },
            saveTransactionButton: {
                ...args.saveTransactionButton,
                disabled: true
            },
            deleteTransactionButton: {
                ...args.deleteTransactionButton,
                disabled: true
            },
            cancelButton: {
                ...args.cancelButton,
                disabled: true
            },
            customButton: {
                ...args.customButton,
                disabled: true
            }
        };
        const unbusySettings: UnbusySettings = {
            addNewTransactionButton: {
                ...args.addNewTransactionButton,
                disabled: false
            },
            saveTransactionButton: {
                ...args.saveTransactionButton,
                disabled: false
            },
            deleteTransactionButton: {
                ...args.deleteTransactionButton,
                disabled: false
            },
            cancelButton: {
                ...args.cancelButton,
                disabled: false
            },
            customButton: {
                ...args.customButton,
                disabled: false
            }
        };

        const [, setArgs] = useArgs<TransactionTableProps>();
        const transactionTableRef = useRef<TransactionTableRef>();

        return (
            <TransactionTableWithValidation
                {...args}
                ref={transactionTableRef}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}
                addNewTransactionButton={{
                    ...args.addNewTransactionButton,
                    icon: DefaultIconSet.PlusCircle,
                    text: "Add New",
                    onPress: () =>
                    {
                        const mode = TransactionRecord.Mode.Draft;
                        const selectedTransaction: TransactionTableProps["selectedTransaction"] = {
                            id: EMPTY_STRING,
                            data: {
                                name: EMPTY_STRING,
                                tags: TestData.tags,
                                amount: 0,
                                executedDate: getExecutedDateFrom(args.selectedDate)
                            }
                        };

                        setArgs({
                            mode,
                            selectedTransaction,
                            summary: {...args.summary, ...TestData.getSummaryFigures(mode, args.selectedDate, selectedTransaction)}
                        });
                    }
                }}
                saveTransactionButton={{
                    ...args.saveTransactionButton,
                    icon: DefaultIconSet.FloppyDisk,
                    text: "Save",
                    onPress: async () =>
                    {
                        setArgs({
                            ...busySettings,
                            mode: TransactionRecord.Mode.ReadOnly,
                            displayPanel: {
                                icon: DefaultIconSet.Gear,
                                message: "Saving Transaction",
                                theme: DisplayPanelTheme.Highlighted,
                                isIconAnimationPlaying: true,
                                isVisible: true
                            }
                        });

                        await new Promise(resolve => { setTimeout(resolve, 2000); });
                        if (args.selectedTransaction.id === EMPTY_STRING)
                        {
                            const newlyAddedTransactionId = `${Date.now()}`;
                            transactionTableRef.current?.flashHighlightTransactions([newlyAddedTransactionId]);

                            TestData.transactions[newlyAddedTransactionId] = {
                                name: args.selectedTransaction.data.name,
                                amount: args.selectedTransaction.data.amount,
                                tags: args.selectedTransaction.data.tags,
                                executedDate: args.selectedTransaction.data.executedDate,
                                createdDate: new Date()
                            };
                        }
                        else
                        {
                            transactionTableRef.current?.flashHighlightTransactions([args.selectedTransaction.id]);
                            TestData.transactions[args.selectedTransaction.id] = {
                                ...args.transactions[args.selectedTransaction.id],
                                name: args.selectedTransaction.data.name,
                                amount: args.selectedTransaction.data.amount,
                                tags: args.selectedTransaction.data.tags,
                                executedDate: args.selectedTransaction.data.executedDate,
                                modifiedDate: new Date()
                            };
                        }

                        setArgs({
                            ...unbusySettings,
                            selectedTransaction: undefined,
                            transactions: {...TestData.transactions},
                            displayPanel: {
                                icon: DefaultIconSet.CheckMark,
                                theme: DisplayPanelTheme.Positive,
                                message: "Saved Successfully"
                            }
                        });
                    }
                }}
                deleteTransactionButton={{
                    ...args.deleteTransactionButton,
                    icon: DefaultIconSet.TrashCan,
                    text: "Delete",
                    onPress: async () =>
                    {
                        setArgs({
                            ...busySettings,
                            displayPanel: {
                                icon: DefaultIconSet.Gear,
                                message: "Deleting Transaction",
                                theme: DisplayPanelTheme.Negative,
                                isIconAnimationPlaying: true,
                                isVisible: true
                            }
                        });

                        await new Promise(resolve => { setTimeout(resolve, 2000); });
                        delete TestData.transactions[args.selectedTransaction.id];

                        setArgs({
                            ...unbusySettings,
                            mode: TransactionRecord.Mode.ReadOnly,
                            transactions: {...TestData.transactions},
                            selectedTransaction: undefined,
                            displayPanel: {
                                icon: DefaultIconSet.CheckMark,
                                theme: DisplayPanelTheme.Positive,
                                message: "Deleted Successfully"
                            }
                        });
                    }
                }}
                cancelButton={{
                    ...args.cancelButton,
                    icon: DefaultIconSet.XMarkInsideCircle,
                    text: "Cancel",
                    onPress: () =>
                    {
                        const mode = TransactionRecord.Mode.ReadOnly;
                        setArgs({
                            mode,
                            selectedTransaction: undefined,
                            summary: {...args.summary, ...TestData.getSummaryFigures(mode, args.selectedDate)}
                        });
                    }
                }}
                customButton={{
                    ...args.customButton,
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
                        summary: {...args.summary, ...TestData.getSummaryFigures(newMode, args.selectedDate, selectedTransaction)}
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
                        summary: {...args.summary, ...TestData.getSummaryFigures(args.mode, args.selectedDate, selectedTransaction)}
                    });
                }}
                onSelectDate={newDate =>
                {
                    const mode = args.displayPanel?.isVisible ? args.mode : TransactionRecord.Mode.ReadOnly;
                    const selectedTransaction = args.displayPanel?.isVisible ? args.selectedTransaction : undefined;
                    setArgs({
                        mode,
                        selectedTransaction,
                        selectedDate: newDate,
                        summary: {...args.summary, ...TestData.getSummaryFigures(mode, newDate, selectedTransaction)}
                    });
                }}
                onSelectTransaction={transactionId =>
                {
                    const mode = TransactionRecord.Mode.Edit;
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
                        mode,
                        selectedTransaction,
                        summary: {...args.summary, ...TestData.getSummaryFigures(mode, args.selectedDate, selectedTransaction)}
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
        maxSelectedTagCount: Sb.number(0),
        summary: Sb.locked,
        transactions: Sb.locked,
        selectedDate: Sb.locked,
        selectedTransaction: Sb.locked,
        mode: Sb.locked,
        displayPanel: Sb.locked,
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
            ...TestData.getSummaryFigures(TransactionRecord.Mode.ReadOnly, today)
        },
        selectedDate: today,
        maxSelectedTagCount: 3,
        transactions: {...TestData.transactions}
    }
};
