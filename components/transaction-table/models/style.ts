import {CalendarStyle} from "@miniskylab/antimatter-calendar";
import {DatePickerStyle} from "@miniskylab/antimatter-date-picker";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {DataListStyle} from "@miniskylab/antimatter-data-list";
import {Summary, TransactionRecord} from "../components";
import {TransactionTableProps} from "./props";
import {TransactionTableState} from "./state";

export type TransactionTableStyle = (
    transactionTableProps: WithoutStyle<TransactionTableProps>,
    transactionTableState: TransactionTableState
) => {
    Root: ViewStyle;
    Calendar: CalendarStyle;
    DatePicker: DatePickerStyle;
    Summary: Summary.Style;
    TransactionList: DataListStyle;
    TransactionRecord: TransactionRecord.Style;
};
