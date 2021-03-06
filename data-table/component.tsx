import {Icon, IconName} from "@miniskylab/antimatter-icon";
import React, {createRef, RefObject} from "react";
import {Record} from "./components";
import {Props} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class Component extends React.Component<Props>
{
    static defaultProps: Partial<Props> = {
        variant: Variant.Default,
        headerRowCells: [],
        records: [],
        rowCountPerPage: 15,
        pxMinPageWidth: 570
    };

    private browserResizeEventTimerId = NaN;
    private readonly browserResizeEventHandler = this.onBrowserResize.bind(this);
    private readonly ref: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
    private readonly pxGutterWidth = 15;

    render(): JSX.Element
    {
        return (
            <div ref={this.ref} className={this.props.variant["data-table"]}>
                {this.renderPages()}
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

    private getPageCount(): number
    {
        if (!this.ref.current)
        {
            return 0;
        }

        const minPageCount = 1;
        const dataTableWidth = this.ref.current.getBoundingClientRect().width;
        const pageCount = dataTableWidth / (this.props.pxMinPageWidth + this.pxGutterWidth.double());

        return Math.trunc(pageCount).clamp(minPageCount, this.props.maxPageCount);
    }

    private renderPages(): JSX.Element[]
    {
        const pageCount = this.getPageCount();
        if (!pageCount)
        {
            return [];
        }

        const pageStyles = {
            margin: `0 ${this.pxGutterWidth}px`,
            width: `calc(${Number.ONE_HUNDRED_PERCENT / pageCount}% - ${this.pxGutterWidth.double()}px)`
        };

        const pages: JSX.Element[] = [];
        for (let pageIndex = 0; pageIndex < pageCount; pageIndex++)
        {
            pages.push(
                <div key={pageIndex} className={this.props.variant["data-table__page"]} style={pageStyles}>
                    {this.renderRowsForPage(pageIndex)}
                </div>
            );
        }

        return pages;
    }

    private renderRowsForPage(pageIndex: number): JSX.Element[]
    {
        const rows: JSX.Element[] = [];

        renderHeaderRow(this.props);
        function renderHeaderRow(props: Props)
        {
            if (props.headerRowCells && props.headerRowCells.length > 0)
            {
                rows.push(
                    <Record.Component
                        id={props.headerRowCells.map(x => x.text).join()}
                        key={props.headerRowCells.map(x => x.text).join()}
                        cells={props.headerRowCells.map(labelProps => ({dataType: "label", data: labelProps}))}
                    />
                );
            }
        }

        renderAddNewRow(this.props);
        function renderAddNewRow(props: Props)
        {
            if (pageIndex === 0 && props.addNewRowText)
            {
                rows.push(
                    <div key={"add-new-row"} className={props.variant["data-table__add-new-row"]}>
                        <Icon iconName={IconName.PlusCircle} className={props.variant["data-table__add-new-icon"]}/>
                        <div className={props.variant["data-table__add-new-label"]}>{props.addNewRowText}</div>
                    </div>
                );
            }
        }

        renderRecords(this.props);
        function renderRecords(props: Props)
        {
            const recordsInCurrentPage = props.records.slice(
                props.addNewRowText
                    ? (pageIndex * props.rowCountPerPage - 1).clamp(0)
                    : pageIndex * props.rowCountPerPage,
                props.addNewRowText
                    ? (pageIndex + 1) * props.rowCountPerPage - 1
                    : (pageIndex + 1) * props.rowCountPerPage
            );

            for (let rowIndex = 0; rowIndex < props.rowCountPerPage; rowIndex++)
            {
                if (rowIndex >= recordsInCurrentPage.length)
                {
                    rows.push(<Record.Component id={`${rowIndex}`} key={rowIndex}/>);
                    continue;
                }

                const rowRecord = recordsInCurrentPage[rowIndex];
                rows.push(
                    <Record.Component
                        id={rowRecord.id}
                        key={rowRecord.id}
                        cells={props.records.find(x => x.id === rowRecord.id).cells}
                        onSaveButtonClick={props.onRecordSave ? () => { props.onRecordSave(rowRecord.id); } : undefined}
                        onCancelButtonClick={props.onRecordSave ? () => { props.onRecordDraftDiscard(rowRecord.id); } : undefined}
                        onDeleteButtonClick={props.onRecordSave ? () => { props.onRecordDelete(rowRecord.id); } : undefined}
                        onClick={
                            props.onRowClick && rowRecord.id !== props.selectedRecordId
                                ? () => { props.onRowClick(rowRecord.id); }
                                : undefined
                        }
                    />
                );
            }
        }

        InsertAnEmptyRowToMakeUpForTheAddNewRow(this.props);
        function InsertAnEmptyRowToMakeUpForTheAddNewRow(props: Props)
        {
            if (rows.length <= props.rowCountPerPage + 1)
            {
                rows.push(
                    <Record.Component
                        id={`${props.rowCountPerPage + 1}`}
                        key={props.rowCountPerPage + 1}
                    />
                );
            }
        }

        return rows;
    }
}
