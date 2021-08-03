import {ComponentName, Decorator} from "antimatter/infrastructures";
import {CalendarComponent} from "./calendar-component";
import {CalendarComponentProps} from "./models/calendar-component-props";
import {CalendarExporter} from "./models/calendar-exporter";

export const CalendarComponentName = Decorator.getValue(ComponentName, CalendarComponentProps) as string;

export {CalendarComponent};
export {CalendarComponentProps};

export {CalendarVariant} from "./variants";
export type {CalendarExportProps as CalendarProps} from "./models/calendar-export-props";
export const Calendar = new CalendarExporter().export(CalendarComponent);
