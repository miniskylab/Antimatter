import {ButtonStyle} from "@miniskylab/antimatter-button";
import {CalendarStyle} from "@miniskylab/antimatter-calendar";
import {DatePickerStyle} from "@miniskylab/antimatter-date-picker";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {ScrollViewStyle} from "@miniskylab/antimatter-scroll-view";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
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
    MainContainer: ViewStyle;
    DisplayPanel?: ViewStyle;
    DisplayIcon?: IconStyle;
    DisplayMessage?: TextStyle;
    ControlPanel: ViewStyle;
    Button1: ButtonStyle;
    Button2: ButtonStyle;
    Button3: ButtonStyle;
    TransactionList: ScrollViewStyle;
    TransactionRecord: TransactionRecord.Style;
    TopHr: ViewStyle;
    BottomHr: ViewStyle;
};
