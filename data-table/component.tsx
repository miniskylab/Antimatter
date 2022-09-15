import {Button} from "@miniskylab/antimatter-button";
import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
import {Label} from "@miniskylab/antimatter-label";
import {bem} from "@miniskylab/antimatter-model";
import {Enum} from "@miniskylab/antimatter-typescript";
import React from "react";
import {DataTableRow} from "./components";
import {DataTableProps, IControlPanel} from "./model";

export function DataTable({
    className,
    minRowCount = 15,
    title,
    subTitle,
    headerRow,
    dataRows,
    selectedRow,
    mode = DataTableRow.Mode.ReadOnly,
    onSwitchMode,
    onSelectRow,
    onSaveRow,
    onDeleteRow,
    onCancel
}: DataTableProps): JSX.Element
{
    const {modeButton, actionButton, cancelButton} = getControlPanelModel();
    return (
        <div className={bem(className)}>
            {renderControlPanel()}
            <div className={bem(className, "Container")}>
                <div className={bem(className, "Scroll")}>
                    {renderRows()}
                </div>
            </div>
        </div>
    );

    function getControlPanelModel(): IControlPanel
    {
        switch (mode)
        {
            case DataTableRow.Mode.Draft:
                return {
                    modeButton: {modifier: "Draft", icon: Icomoon.Quill, text: "Draft-Mode"},
                    actionButton: {modifier: "Edit", icon: Icomoon.FloppyDisk, text: "Save", onClick: onSaveRow},
                    cancelButton: {modifier: String.EMPTY, icon: Icomoon.XMarkInsideCircle, text: "Cancel", onClick: onCancel}
                };

            case DataTableRow.Mode.Edit:
                return {
                    modeButton: {modifier: "Edit", icon: Icomoon.Quill, text: "Edit-Mode", onClick: switchMode},
                    actionButton: {modifier: "Edit", icon: Icomoon.FloppyDisk, text: "Save", onClick: onSaveRow},
                    cancelButton: {modifier: String.EMPTY, icon: Icomoon.XMarkInsideCircle, text: "Cancel", onClick: onCancel}
                };

            case DataTableRow.Mode.Delete:
                return {
                    modeButton: {modifier: "Delete", icon: Icomoon.Fire, text: "Delete-Mode", onClick: switchMode},
                    actionButton: {modifier: "Delete", icon: Icomoon.TrashCan, text: "Delete", onClick: onDeleteRow},
                    cancelButton: {modifier: String.EMPTY, icon: Icomoon.XMarkInsideCircle, text: "Cancel", onClick: onCancel}
                };

            default:
            case DataTableRow.Mode.ReadOnly:
                return {
                    modeButton: {modifier: "Disabled", icon: Icomoon.Eye, text: "Read-Only"},
                    actionButton: {modifier: "Disabled", icon: Icomoon.FloppyDisk, text: "Save"},
                    cancelButton: {modifier: "Disabled", icon: Icomoon.XMarkInsideCircle, text: "Cancel"}
                };
        }
    }

    function getRowMode(rowId: string): DataTableRow.Mode
    {
        return rowId && rowId === selectedRow?.id
            ? mode
            : DataTableRow.Mode.ReadOnly;
    }

    function renderControlPanel(): JSX.Element
    {
        return (
            <div className={bem(className, "ControlPanel")}>
                <div className={bem(className, "Title")}>
                    <Label className={bem("DataTable-MainTitle")} text={title}/>
                    <Label className={bem("DataTable-SubTitle")} text={subTitle}/>
                </div>
                <Button
                    className={bem("DataTable-ControlButton", null, actionButton.modifier)}
                    icon={actionButton.icon}
                    label={actionButton.text}
                    onClick={actionButton.onClick}
                />
                <Button
                    className={bem("DataTable-ControlButton", null, modeButton.modifier)}
                    icon={modeButton.icon}
                    label={modeButton.text}
                    onClick={modeButton.onClick}
                />
                <Button
                    className={bem("DataTable-ControlButton", null, cancelButton.modifier)}
                    icon={cancelButton.icon}
                    label={cancelButton.text}
                    onClick={cancelButton.onClick}
                />
            </div>
        );
    }

    function renderRows(): JSX.Element[]
    {
        const rowJsxElements = [];
        if (headerRow?.cells && headerRow.cells.length > 0)
        {
            rowJsxElements.push(
                <React.Fragment key={-1}>
                    <DataTableRow.Component
                        {...headerRow}
                        className={bem("DataTable-HeaderRow")}
                    />
                    <div className={bem(className, "Hr")}/>
                </React.Fragment>
            );
        }

        const rowIds = dataRows ? Object.keys(dataRows) : [];
        const rowCount = rowIds.length > minRowCount ? rowIds.length : minRowCount;

        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++)
        {
            const rowId = rowIds[rowIndex];
            rowJsxElements.push(
                <DataTableRow.Component
                    {...(rowId ? dataRows[rowId] : {})}
                    key={rowIndex}
                    mode={getRowMode(rowId)}
                    className={bem("DataTable-DataRow")}
                    onClick={mode === DataTableRow.Mode.ReadOnly ? () => { onSelectRow(rowId); } : undefined}
                />
            );
        }

        return rowJsxElements;
    }

    function switchMode(): void
    {
        switch (mode)
        {
            case DataTableRow.Mode.ReadOnly:
                onSwitchMode(DataTableRow.Mode.Draft);
                break;

            case DataTableRow.Mode.Edit:
                onSwitchMode(DataTableRow.Mode.Delete);
                break;

            case DataTableRow.Mode.Delete:
                onSwitchMode(DataTableRow.Mode.Edit);
                break;

            default:
                throw new Error(`No valid mode to switch to from mode "${Enum.getName(DataTableRow.Mode, mode)}"`);
        }
    }
}
