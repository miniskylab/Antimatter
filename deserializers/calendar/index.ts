import {Calendar as CalendarComponent} from "@miniskylab/antimatter-calendar";
import {CalendarDeserializerCreator} from "./deserializer-creator";

export const Calendar = new CalendarDeserializerCreator().createFrom(CalendarComponent);
