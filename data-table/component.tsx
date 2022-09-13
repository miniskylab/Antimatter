import {Label} from "@miniskylab/antimatter-label";
import {bem} from "@miniskylab/antimatter-model";
import React from "react";
import {DataTableRow} from "./components";
import {DataTableProps} from "./model";

export function DataTable({
    className,
    minRowCount = 15,
    title,
    headerRow,
    dataRows,
    selectedRow
}: DataTableProps): JSX.Element
{
    return (
        <div className={bem(className)}>
            {<Label className={bem("DataTable-Title")} text={title}/>}
            <div className={bem(className, "Page")}>
                {renderRows()}
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
