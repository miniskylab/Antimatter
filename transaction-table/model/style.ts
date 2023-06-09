import {ButtonStyle} from "@miniskylab/antimatter-button";
import {CalendarStyle} from "@miniskylab/antimatter-calendar";
import {DatePickerStyle} from "@miniskylab/antimatter-date-picker";
import {Styled} from "@miniskylab/antimatter-framework";
import {ScrollViewStyle} from "@miniskylab/antimatter-scroll-view";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Summary, TransactionRecord} from "../component";
import {TransactionTableProps} from "./props";

export type TransactionTableStyle = (transactionTableProps: Styled<TransactionTableProps>) => {
    Root?: ViewStyle;
    TransactionDetails?: ViewStyle;
    TransactionContainer?: ScrollViewStyle;
    Hr?: ViewStyle;
    Calendar?: CalendarStyle;
    DatePicker?: DatePickerStyle;
    ControlPanel?: ViewStyle;
    ControlButton?: ButtonStyle;
    TransactionRecord?: TransactionRecord.Style;
    AddNewButton?: ButtonStyle;
    Summary?: Summary.Style;
};
