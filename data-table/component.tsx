import {Button} from "@miniskylab/antimatter-button";
import {Icomoon} from "@miniskylab/antimatter-icon/collection/icomoon";
import {Label} from "@miniskylab/antimatter-label";
import {bem} from "@miniskylab/antimatter-model";
import React from "react";
import {DataTableRow} from "./components";
import {DataTableProps} from "./model";

export function DataTable({
    className,
    minRowCount = 15,
    title,
    subTitle,
    headerRow,
    dataRows,
    selectedRow
}: DataTableProps): JSX.Element
{
    return (
        <div className={bem(className)}>
            <div className={bem(className, "ControlPanel")}>
                <div className={bem(className, "Title")}>
                    <Label className={bem("DataTable-MainTitle")} text={title}/>
                    <Label className={bem("DataTable-SubTitle")} text={subTitle}/>
                </div>
                <Button
                    className={bem("DataTable-ControlButton")}
                    icon={Icomoon.FloppyDisk}
                    label={"Save"}
                />
                <Button
                    className={bem("DataTable-ControlButton")}
                    icon={Icomoon.Eye}
                    label={"Read-Only"}
                />
                <Button
                    className={bem("DataTable-ControlButton")}
                    icon={Icomoon.XMarkInsideCircle}
                    label={"Cancel"}
                />
            </div>
            <div className={bem(className, "Container")}>
                <div className={bem(className, "Scroll")}>
                    {renderRows()}
                </div>
            </div>
        </div>
    );

    function renderRows(): JSX.Element[]
    {
        const rowJsxElements = [];
        if (headerRow?.cells && headerRow.cells.length > 0)
        {
            rowJsxElements.push(
                <DataTableRow.Component
                    key={-1}
                    {...headerRow}
                    className={bem("DataTable-HeaderRow")}
                />
            );
        }

        const rowIds = dataRows ? Object.keys(dataRows) : [];
        const rowCount = rowIds.length > minRowCount ? rowIds.length : minRowCount;

        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++)
        {
            const rowId = rowIds[rowIndex];
            rowJsxElements.push(
                <DataTableRow.Component
                    key={rowIndex}
                    {...(rowId ? dataRows[rowId] : {})}
                    className={bem("DataTable-DataRow", null, rowId && rowId === selectedRow?.id && "Selected")}
                />
            );
        }

        return rowJsxElements;
    }
}
