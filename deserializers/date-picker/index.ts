import {DatePicker as DatePickerComponent} from "@miniskylab/antimatter-date-picker";
import {DatePickerDeserializerCreator} from "./deserializer-creator";

export const DatePicker = new DatePickerDeserializerCreator().createFrom(DatePickerComponent);
