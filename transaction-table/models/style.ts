import {ButtonStyle} from "@miniskylab/antimatter-button";
import {CalendarStyle} from "@miniskylab/antimatter-calendar";
import {DatePickerStyle} from "@miniskylab/antimatter-date-picker";
import {Styled} from "@miniskylab/antimatter-framework";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {ScrollViewStyle} from "@miniskylab/antimatter-scroll-view";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Summary, TransactionRecord} from "../components";
import {TransactionTableProps} from "./props";
import {TransactionTableState} from "./state";

export type TransactionTableStyle = (
    transactionTableProps: Styled<TransactionTableProps>,
    transactionTableState: TransactionTableState
) => {
    Root?: ViewStyle;
    Calendar?: CalendarStyle;
    DatePicker?: DatePickerStyle;
    Summary?: Summary.Style;
    TransactionDetails?: ViewStyle;
    DisplayPanel?: ViewStyle;
    Title?: LabelStyle;
    Subtitle?: LabelStyle;
    ControlPanel?: ViewStyle;
    ControlButton?: ButtonStyle;
    TransactionContainer?: ScrollViewStyle;
    TransactionRecord?: TransactionRecord.Style;
    AddNewButton?: ButtonStyle;
    Hr?: ViewStyle;
};
