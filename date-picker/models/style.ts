import {ButtonStyle} from "@miniskylab/antimatter-button";
import {CalendarStyle} from "@miniskylab/antimatter-calendar";
import {Styled} from "@miniskylab/antimatter-framework";
import {InputFieldStyle} from "@miniskylab/antimatter-input-field";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {DatePickerProps} from "./props";

export type DatePickerStyle = (datePickerProps: Styled<DatePickerProps>) => {
    Root?: ViewStyle;
    InputField?: InputFieldStyle;
    Addon?: ButtonStyle;
    Caret?: ViewStyle;
    Calendar?: CalendarStyle;
};
