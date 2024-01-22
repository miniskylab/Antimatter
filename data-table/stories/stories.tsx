import {EMPTY_STRING, Sb, withValidation} from "@miniskylab/antimatter-framework";
import {useArgs} from "@storybook/preview-api";
import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {Row} from "../components";
import {DataTable} from "../main";
import {DataTableProps} from "../models";
import {TestData} from "./test-data";
import * as Variant from "./variants";

const DataTableWithValidation = withValidation(DataTable, DataTableProps);
export default {
    component: DataTable,
    title: "Components/Data Table",
    render: (args: Required<DataTableProps>) =>
    {
        const [, setArgs] = useArgs<DataTableProps>();
        return (
            <DataTableWithValidation
                {...args}
                key={Sb.useNewKeyIfAnyOfTheseChanges([args.style])}
                onSwitchMode={newMode =>
                {
                    setArgs({
                        mode: newMode,
                        selectedRow: {
                            id: args.selectedRow.id,
                            data: args.rows[args.selectedRow.id]
                        }
                    });
                }}
                onChangeRow={newData =>
                {
                    setArgs({
                        selectedRow: {
                            id: args.selectedRow.id,
                            data: newData
                        }
                    });
                }}
                onSelectRow={rowId =>
                {
                    setArgs({
                        mode: Row.Mode.Edit,
                        selectedRow: {
                            id: rowId,
                            data: args.rows[rowId]
                        }
                    });
                }}
                onAddNewRow={() =>
                {
                    setArgs({
                        mode: Row.Mode.Draft,
                        selectedRow: {
                            id: EMPTY_STRING,
                            data: [EMPTY_STRING, EMPTY_STRING, TestData.menuItems, false]
                        }
                    });
                }}
                onSaveRow={() =>
                {
                    if (args.selectedRow.id === EMPTY_STRING)
                    {
                        args.rows[`${Date.now()}`] = args.selectedRow.data;
                    }
                    else
                    {
                        args.rows[args.selectedRow.id] = args.selectedRow.data;
                    }

                    setArgs({
                        mode: Row.Mode.ReadOnly,
                        selectedRow: undefined
                    });
                }}
                onDeleteRow={() =>
                {
                    delete args.rows[args.selectedRow.id];
                    setArgs({
                        mode: Row.Mode.ReadOnly,
                        selectedRow: undefined
                    });
                }}
                onCancel={() =>
                {
                    setArgs({
                        mode: Row.Mode.ReadOnly,
                        selectedRow: undefined
                    });
                }}
            />
        );
    }
} satisfies Meta<typeof DataTable>;
type Story = StoryObj<typeof DataTable>;

export const Playground: Story = {
    argTypes: {
        style: Sb.styleSelector(Variant),
        columns: Sb.locked,
        rows: Sb.locked,
        selectedRow: Sb.locked,
        mode: Sb.locked,
        onSwitchMode: Sb.locked,
        onChangeRow: Sb.locked,
        onSelectRow: Sb.locked,
        onAddNewRow: Sb.locked,
        onSaveRow: Sb.locked,
        onDeleteRow: Sb.locked,
        onCancel: Sb.locked
    },
    args: {
        style: Sb.getVariantName(Variant, Variant.Default),
        title: "Lorem ipsum dolor sit amet",
        subtitle: "Lorem ipsum dolor sit amet",
        minRowCount: 15,
        rows: TestData.rows,
        columns: TestData.columns
    }
};
