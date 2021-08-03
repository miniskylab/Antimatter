import {Button} from "antimatter/button";
import {Icon, IconName} from "antimatter/icon";
import React, {Component, createRef, RefObject} from "react";
import {Record} from "./components/record";
import {DataTableComponentProps} from "./models/data-table-component-props";
import {TabularRecordCancelButtonVariant, TabularRecordDeleteButtonVariant, TabularRecordOkButtonVariant} from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class DataTableComponent extends Component<DataTableComponentProps>
{
    private browserResizeEventTimerId = NaN;
    private readonly browserResizeEventHandler = this.onBrowserResize.bind(this);
    private readonly ref: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
    private readonly pxGutterWidth = 15;

    render(): JSX.Element
    {
        return (
            <div
                ref={this.ref}
                className={this.props.variant["data-table"]}
            >
                {this.renderColumns()}
            </div>
        );
    }

    componentDidMount(): void { window.addEventListener("resize", this.browserResizeEventHandler); }

    componentWillUnmount(): void { window.removeEventListener("resize", this.browserResizeEventHandler); }

    private onBrowserResize(): void
    {
        if (this.browserResizeEventTimerId)
        {
            return;
        }

        this.browserResizeEventTimerId = window.setTimeout((): void =>
        {
            this.browserResizeEventTimerId = NaN;
            this.forceUpdate();
        }, (1 / 60) * 1000);
    }

    private getColumnCount(): number
    {
        if (!this.ref.current)
        {
            return 0;
        }

        const minColumnCount = 1;
        const dataTableWidth = this.ref.current.getBoundingClientRect().width;
        const columnCount = dataTableWidth / (this.props.pxMinColumnWidth + this.pxGutterWidth.double());

        return Math.trunc(columnCount).clamp(minColumnCount, this.props.maxColumnCount);
    }

    private renderColumns(): JSX.Element[]
    {
        const columnCount = this.getColumnCount();
        if (!columnCount)
        {
            return [];
        }

        const columnStyles = {
            margin: `0 ${this.pxGutterWidth}px`,
            width: `calc(${Number.ONE_HUNDRED_PERCENT / columnCount}% - ${this.pxGutterWidth.double()}px)`
        };

        const columns: JSX.Element[] = [];
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++)
        {
            columns.push(
                <div key={columnIndex} className={this.props.variant["data-table__column"]} style={columnStyles}>
                    {this.renderRows(columnIndex)}
                </div>
            );
        }

        return columns;
    }

    private renderRows(columnIndex: number): JSX.Element[]
    {
        const rows: JSX.Element[] = [
            <Record
                key={this.props.headerRow.id}
                cellData={[...this.props.headerRow.cells, this.renderControlBox(this.props.headerRow.id, true)]}
            />
        ];

        if (columnIndex === 0 && this.props.addNewRow)
        {
            rows.push(<Record
                key={this.props.addNewRow.id}
                cellData={this.renderAddNewRow()}
                onClick={(): void => { this.props.onRowClicked(this.props.addNewRow.id); }}
            />);
        }

        const rowsInCurrentColumn = this.props.rows.slice(
            this.props.addNewRow ? (columnIndex * this.props.rowCount - 1).clamp(0) : columnIndex * this.props.rowCount,
            this.props.addNewRow ? (columnIndex + 1) * this.props.rowCount - 1 : (columnIndex + 1) * this.props.rowCount
        );

        for (let rowIndex = 0; rowIndex < this.props.rowCount; rowIndex++)
        {
            if (rowIndex >= rowsInCurrentColumn.length)
            {
                rows.push(<Record key={rowIndex}/>);
                continue;
            }

            rows.push(<Record
                key={rowsInCurrentColumn[rowIndex].id}
                cellData={[
                    ...this.props.rows.filter((r): boolean => r.id === rowsInCurrentColumn[rowIndex].id)[0].cells,
                    this.renderControlBox(
                        rowsInCurrentColumn[rowIndex].id,
                        false,
                        rowsInCurrentColumn[rowIndex].id !== this.props.selectedRowId
                    )
                ]}
                onClick={
                    rowsInCurrentColumn[rowIndex].id === this.props.selectedRowId
                        ? undefined
                        : (): void =>
                        {
                            if (rowsInCurrentColumn[rowIndex].id !== this.props.selectedRowId)
                            {
                                this.props.onRowClicked(rowsInCurrentColumn[rowIndex].id);
                            }
                        }
                }
            />);
        }

        if (rows.length <= this.props.rowCount + 1)
        {
            rows.push(<Record key={this.props.rowCount + 1}/>);
        }

        return rows;
    }

    private renderAddNewRow(): JSX.Element[]
    {
        return [
            <>
                <Icon iconName={IconName.PlusCircle} className={this.props.variant["data-table__add-new-icon"]}/>
                <div className={this.props.variant["data-table__add-new-label"]}>{this.props.addNewRow.text}</div>
            </>
        ];
    }

    private renderControlBox(rowId: string, isEmpty = false, disabled = true): JSX.Element
    {
        let vrClassName = "data-table__vr";
        let controlBoxClassName = "data-table__control-box";
        if (!isEmpty && disabled) vrClassName += "--disabled";
        if (!isEmpty && !disabled) controlBoxClassName += "--selected";

        return (
            <div className={this.props.variant[controlBoxClassName]}>
                {!isEmpty && (
                    <>
                        <Button
                            variant={TabularRecordOkButtonVariant}
                            disabled={disabled}
                            icon={"CheckMark"}
                            onClick={(mouseEvent: React.MouseEvent<HTMLElement>): void =>
                            {
                                mouseEvent.stopPropagation();
                                this.props.onSaveButtonClicked(rowId);
                            }}
                        />
                        <Button
                            variant={TabularRecordCancelButtonVariant}
                            disabled={disabled}
                            icon={"XMark"}
                            onClick={(mouseEvent: React.MouseEvent<HTMLElement>): void =>
                            {
                                mouseEvent.stopPropagation();
                                this.props.onCancelButtonClicked(rowId);
                            }}
                        />
                        <div className={this.props.variant[vrClassName]}/>
                        <Button
                            variant={TabularRecordDeleteButtonVariant}
                            disabled={disabled}
                            icon={"TrashCan"}
                            onClick={(mouseEvent: React.MouseEvent<HTMLElement>): void =>
                            {
                                mouseEvent.stopPropagation();
                                this.props.onDeleteButtonClicked(rowId);
                            }}
                        />
                    </>
                )}
            </div>
        );
    }
}
