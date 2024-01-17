import {ButtonStyle} from "@miniskylab/antimatter-button";
import {CalendarStyle} from "@miniskylab/antimatter-calendar";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {InputFieldStyle} from "@miniskylab/antimatter-input-field";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {DatePickerProps} from "./props";

export type DatePickerStyle = (datePickerProps: WithoutStyle<DatePickerProps>) => {
    Root: ViewStyle;
    InputField: InputFieldStyle;
    Addon: ButtonStyle;
    Caret: ViewStyle;
    Calendar: CalendarStyle;
};
