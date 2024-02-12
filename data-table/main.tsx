import {Button} from "@miniskylab/antimatter-button";
import {AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Label} from "@miniskylab/antimatter-label";
import {ScrollView} from "@miniskylab/antimatter-scroll-view";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo, useRef} from "react";
import {Row} from "./components";
import {ControlButtonTypeContext, DataTableContext, DataTableProps, RowTypeContext} from "./models";
import {ControlPanel} from "./types";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
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

    const context = useMemo<DataTableContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    const scrollViewRef = useRef<ScrollView>(null);
    const headerData = columns?.map(x => x.name).filter(x => !!x);

    return (
        <DataTableContext.Provider value={context}>
            <View style={computedStyle.Root}>
                {renderControlPanel()}
                {(headerData && headerData.length > 0) && (
                    <RowTypeContext.Provider value={"header"}>
                        <Row.Component style={computedStyle.Row} data={headerData}/>
                    </RowTypeContext.Provider>
                )}
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
                    pressButton1: {type: "action", icon: DefaultIconSet.FloppyDisk, text: "Save", onPress: onSaveRow},
                    switchButton: {type: "mode", icon: DefaultIconSet.Quill, text: "Draft-Mode"},
                    pressButton2: {type: "cancel", icon: DefaultIconSet.XMarkInsideCircle, text: "Cancel", onPress: onCancel}
                };

            case Row.Mode.Edit:
                return {
                    pressButton1: {type: "action", icon: DefaultIconSet.FloppyDisk, text: "Save", onPress: onSaveRow},
                    switchButton: {type: "mode", icon: DefaultIconSet.Quill, text: "Edit-Mode", onPress: switchMode},
                    pressButton2: {type: "cancel", icon: DefaultIconSet.XMarkInsideCircle, text: "Cancel", onPress: onCancel}
                };

            case Row.Mode.Delete:
                return {
                    pressButton1: {type: "action", icon: DefaultIconSet.TrashCan, text: "Delete", onPress: onDeleteRow},
                    switchButton: {type: "mode", icon: DefaultIconSet.Fire, text: "Delete-Mode", onPress: switchMode},
                    pressButton2: {type: "cancel", icon: DefaultIconSet.XMarkInsideCircle, text: "Cancel", onPress: onCancel}
                };

            default:
            case Row.Mode.ReadOnly:
                return {
                    pressButton1: {type: "action", icon: DefaultIconSet.PlusCircle, text: "Add New", onPress: onAddNewRow},
                    switchButton: {type: "mode", icon: DefaultIconSet.Eye, text: "Read-Only"},
                    pressButton2: {type: "cancel", icon: DefaultIconSet.XMarkInsideCircle, text: "Cancel"}
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
        const {pressButton1, switchButton, pressButton2} = getControlPanel();
        return (
            <View style={computedStyle.ControlPanel}>
                <View style={computedStyle.TitleContainer}>
                    <Label style={computedStyle.MainTitle} numberOfLines={1}>{title}</Label>
                    <Label style={computedStyle.Subtitle} numberOfLines={1}>{subtitle}</Label>
                </View>
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
                <RowTypeContext.Provider key={rowIndex} value={isEmptyRow(rowId) ? "empty" : "data"}>
                    <Row.Component
                        containerRef={scrollViewRef}
                        data={rowData}
                        mode={rowMode}
                        columns={columns}
                        style={computedStyle.Row}
                        onPress={canSelect ? () => { onSelectRow(rowId); } : undefined}
                        onChange={canEdit ? newData => { onChangeRow(newData); } : undefined}
                    />
                </RowTypeContext.Provider>
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
