import {Button} from "@miniskylab/antimatter-button";
import {type AllPropertiesMustPresent, Ts, useComponentContext, useComputedStyle} from "@miniskylab/antimatter-framework";
import {ScrollView} from "@miniskylab/antimatter-scroll-view";
import {Text} from "@miniskylab/antimatter-text";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useRef} from "react";
import {Row} from "./components";
import {DataTableContext, DataTableProps} from "./models";
import type {ControlPanel} from "./types";
import * as Variant from "./variants";

/**
 * A grid that organizes data into rows and columns, where each row represents a unique record, and each column represents a particular
 * attribute of the record.
 */
export function DataTable({
    style = Variant.Default,
    title,
    subtitle,
    columns,
    rows,
    selectedRow,
    mode = Row.Mode.ReadOnly,
    minRowCount = 15,
    onChangeRow,
    onSwitchMode,
    onSelectRow,
    onAddNewRow,
    onSaveRow,
    onDeleteRow,
    onCancel
}: DataTableProps): JSX.Element
{
    const props: AllPropertiesMustPresent<DataTableProps> = {
        style, title, subtitle, columns, rows, selectedRow, mode, minRowCount, onChangeRow, onSwitchMode, onSelectRow, onAddNewRow,
        onSaveRow, onDeleteRow, onCancel
    };

    const scrollViewRef = useRef<ScrollView>(null);
    const headerData = columns?.map(x => x.name).filter(x => !!x);

    const context = useComponentContext<DataTableContext>({props});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <DataTableContext.Provider value={context}>
            <View style={computedStyle.Root}>
                {renderControlPanel()}
                {(headerData && headerData.length > 0) && <Row.Component style={computedStyle.HeaderRow} data={headerData}/>}
                <ScrollView
                    ref={scrollViewRef}
                    style={computedStyle.Scroll}
                    stickyHeaderIndices={[0]}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    {(headerData && headerData.length > 0) && <><View style={computedStyle.Hr}/></>}
                    {renderRows()}
                </ScrollView>
            </View>
        </DataTableContext.Provider>
    );

    function isEmptyRow(rowId: string): boolean
    {
        return rowId === undefined;
    }

    function isSelectedRow(rowId: string): boolean
    {
        return rowId === selectedRow?.id;
    }

    function getControlPanel(): ControlPanel
    {
        switch (mode)
        {
            case Row.Mode.Draft:
                return {
                    button1: {icon: DefaultIconSet.FloppyDisk, text: "Save", onPress: onSaveRow},
                    button2: {icon: DefaultIconSet.Quill, text: "Draft-Mode"},
                    button3: {icon: DefaultIconSet.XMarkInsideCircle, text: "Cancel", onPress: onCancel}
                };

            case Row.Mode.Edit:
                return {
                    button1: {icon: DefaultIconSet.FloppyDisk, text: "Save", onPress: onSaveRow},
                    button2: {icon: DefaultIconSet.Quill, text: "Edit-Mode", onPress: switchMode},
                    button3: {icon: DefaultIconSet.XMarkInsideCircle, text: "Cancel", onPress: onCancel}
                };

            case Row.Mode.Delete:
                return {
                    button1: {icon: DefaultIconSet.TrashCan, text: "Delete", onPress: onDeleteRow},
                    button2: {icon: DefaultIconSet.Fire, text: "Delete-Mode", onPress: switchMode},
                    button3: {icon: DefaultIconSet.XMarkInsideCircle, text: "Cancel", onPress: onCancel}
                };

            default:
            case Row.Mode.ReadOnly:
                return {
                    button1: {icon: DefaultIconSet.PlusCircle, text: "Add New", onPress: onAddNewRow},
                    button2: {icon: DefaultIconSet.Eye, text: "Read-Only"},
                    button3: {icon: DefaultIconSet.XMarkInsideCircle, text: "Cancel"}
                };
        }
    }

    function getRowMode(rowId: string): Row.Mode
    {
        return !isEmptyRow(rowId) && isSelectedRow(rowId)
            ? mode
            : Row.Mode.ReadOnly;
    }

    function renderControlPanel(): JSX.Element
    {
        const {button1, button2, button3} = getControlPanel();
        return (
            <View style={computedStyle.ControlPanel}>
                <View style={computedStyle.TitleContainer}>
                    <Text style={computedStyle.MainTitle} numberOfLines={1}>{title}</Text>
                    <Text style={computedStyle.Subtitle} numberOfLines={1}>{subtitle}</Text>
                </View>
                <Button
                    style={computedStyle.Button1}
                    icon={button1.icon}
                    label={button1.text}
                    disabled={!button1.onPress}
                    onPress={button1.onPress}
                />
                <Button
                    style={computedStyle.Button2}
                    icon={button2.icon}
                    label={button2.text}
                    disabled={!button2.onPress}
                    onPress={button2.onPress}
                />
                <Button
                    style={computedStyle.Button3}
                    icon={button3.icon}
                    label={button3.text}
                    disabled={!button3.onPress}
                    onPress={button3.onPress}
                />
            </View>
        );
    }

    function renderRows(): JSX.Element[]
    {
        const rowJsxElements = [];
        const rowIds = rows ? Object.keys(rows) : [];
        if (selectedRow && mode === Row.Mode.Draft)
        {
            rowIds.push(selectedRow.id);
        }

        const rowCount = rowIds.length > minRowCount ? rowIds.length : minRowCount;
        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++)
        {
            const rowId = rowIds[rowIndex];
            const rowMode = getRowMode(rowId);
            const rowData = rowMode === Row.Mode.Edit || rowMode === Row.Mode.Draft
                ? selectedRow?.data
                : rowId
                    ? rows?.[rowId]
                    : [];

            const canSelect = !isEmptyRow(rowId) && mode === Row.Mode.ReadOnly;
            const canEdit = !isEmptyRow(rowId) && (rowMode === Row.Mode.Edit || rowMode === Row.Mode.Draft);
            rowJsxElements.push(
                <Row.Component
                    containerRef={scrollViewRef}
                    key={isEmptyRow(rowId) ? `empty-row-${rowIndex}` : rowId}
                    data={rowData}
                    mode={rowMode}
                    columns={columns}
                    style={isEmptyRow(rowId) ? computedStyle.EmptyRow : computedStyle.DataRow}
                    onPress={canSelect ? () => { onSelectRow(rowId); } : undefined}
                    onChange={canEdit ? newData => { onChangeRow(newData); } : undefined}
                />
            );
        }

        return rowJsxElements;
    }

    function switchMode(): void
    {
        switch (mode)
        {
            case Row.Mode.ReadOnly:
                onSwitchMode(Row.Mode.Draft);
                break;

            case Row.Mode.Edit:
                onSwitchMode(Row.Mode.Delete);
                break;

            case Row.Mode.Delete:
                onSwitchMode(Row.Mode.Edit);
                break;

            default:
                throw new Error(`No valid mode to switch to from mode "${Ts.Enum.getName(Row.Mode, mode)}"`);
        }
    }
}
