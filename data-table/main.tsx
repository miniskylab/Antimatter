import {Button} from "@miniskylab/antimatter-button";
import {Style, Ts} from "@miniskylab/antimatter-framework";
import {Label} from "@miniskylab/antimatter-label";
import {ScrollView} from "@miniskylab/antimatter-scroll-view";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo, useRef} from "react";
import {Row} from "./components";
import {ControlButtonTypeContext, DataTableContext, DataTableProps, RowTypeContext} from "./models";
import {ControlButton, ControlPanel} from "./types";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function DataTable({
    style = Variant.Default,
    title,
    subTitle,
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
    const props: Required<DataTableProps> = {
        style, title, subTitle, columns, rows, selectedRow, mode, minRowCount, onChangeRow, onSwitchMode, onSelectRow, onAddNewRow,
        onSaveRow, onDeleteRow, onCancel
    };

    const context = useMemo<DataTableContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const scrollViewRef = useRef<ScrollView>(null);
    const computedStyle = Style.useComputedStyle(style, props);

    const headerData = columns?.map(x => x.name).filter(x => !!x);
    const {modeButton, actionButton, cancelButton} = getControlPanelModel();

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

    function isAddNewButton(rowId: string): boolean
    {
        return rowId === null;
    }

    function getControlPanelModel(): ControlPanel
    {
        switch (mode)
        {
            case Row.Mode.Draft:
                return {
                    modeButton: {disabled: true, icon: DefaultIconSet.Quill, text: "Draft-Mode"},
                    actionButton: {icon: DefaultIconSet.FloppyDisk, text: "Save", onPress: onSaveRow},
                    cancelButton: {icon: DefaultIconSet.XMarkInsideCircle, text: "Cancel", onPress: onCancel}
                };

            case Row.Mode.Edit:
                return {
                    modeButton: {icon: DefaultIconSet.Quill, text: "Edit-Mode", onPress: switchMode},
                    actionButton: {icon: DefaultIconSet.FloppyDisk, text: "Save", onPress: onSaveRow},
                    cancelButton: {icon: DefaultIconSet.XMarkInsideCircle, text: "Cancel", onPress: onCancel}
                };

            case Row.Mode.Delete:
                return {
                    modeButton: {icon: DefaultIconSet.Fire, text: "Delete-Mode", onPress: switchMode},
                    actionButton: {icon: DefaultIconSet.TrashCan, text: "Delete", onPress: onDeleteRow},
                    cancelButton: {icon: DefaultIconSet.XMarkInsideCircle, text: "Cancel", onPress: onCancel}
                };

            default:
            case Row.Mode.ReadOnly:
                return {
                    modeButton: {disabled: true, icon: DefaultIconSet.Eye, text: "Read-Only"},
                    actionButton: {disabled: true, icon: DefaultIconSet.FloppyDisk, text: "Save"},
                    cancelButton: {disabled: true, icon: DefaultIconSet.XMarkInsideCircle, text: "Cancel"}
                };
        }
    }

    function getAddNewButtonModel(): ControlButton
    {
        switch (mode)
        {
            case Row.Mode.ReadOnly:
                return {icon: DefaultIconSet.PlusCircle, onPress: onAddNewRow};

            default:
                return {disabled: true, icon: DefaultIconSet.NotAllowed};
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
        return (
            <View style={computedStyle.ControlPanel}>
                <View style={computedStyle.TitleContainer}>
                    <Label style={computedStyle.MainTitle} numberOfLines={1}>{title}</Label>
                    <Label style={computedStyle.SubTitle} numberOfLines={1}>{subTitle}</Label>
                </View>
                <ControlButtonTypeContext.Provider value={"action"}>
                    <Button
                        style={computedStyle.ControlButton}
                        icon={actionButton.icon}
                        label={actionButton.text}
                        disabled={actionButton.disabled}
                        onPress={actionButton.onPress}
                    />
                </ControlButtonTypeContext.Provider>
                <ControlButtonTypeContext.Provider value={"mode"}>
                    <Button
                        style={computedStyle.ControlButton}
                        icon={modeButton.icon}
                        label={modeButton.text}
                        disabled={modeButton.disabled}
                        onPress={modeButton.onPress}
                    />
                </ControlButtonTypeContext.Provider>
                <ControlButtonTypeContext.Provider value={"cancel"}>
                    <Button
                        style={computedStyle.ControlButton}
                        icon={cancelButton.icon}
                        label={cancelButton.text}
                        disabled={cancelButton.disabled}
                        onPress={cancelButton.onPress}
                    />
                </ControlButtonTypeContext.Provider>
            </View>
        );
    }

    function renderRows(): JSX.Element[]
    {
        const rowJsxElements = [];
        const rowIds = rows ? Object.keys(rows) : [];
        if (mode === Row.Mode.Draft)
        {
            if (selectedRow)
            {
                rowIds.push(selectedRow.id);
            }
        }
        else
        {
            rowIds.push(null);
        }

        const rowCount = rowIds.length > minRowCount ? rowIds.length : minRowCount;
        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++)
        {
            const rowId = rowIds[rowIndex];
            if (isAddNewButton(rowId))
            {
                const addNewButton = getAddNewButtonModel();
                rowJsxElements.push(
                    <Button
                        key={rowIndex}
                        style={computedStyle.AddNewButton}
                        icon={addNewButton.icon}
                        disabled={addNewButton.disabled}
                        onPress={addNewButton.onPress}
                    />
                );

                continue;
            }

            const rowMode = getRowMode(rowId);
            const rowData = rowMode === Row.Mode.Edit || rowMode === Row.Mode.Draft
                ? selectedRow.data
                : rowId
                    ? rows[rowId]
                    : [];

            const canSelect = !isEmptyRow(rowId) && mode === Row.Mode.ReadOnly;
            const canEdit = !isEmptyRow(rowId) && (rowMode === Row.Mode.Edit || rowMode === Row.Mode.Draft);
            rowJsxElements.push(
                <RowTypeContext.Provider key={rowIndex} value={isEmptyRow(rowId) ? "empty" : undefined}>
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
