import {ComponentName} from "@miniskylab/antimatter-component";
import {Decorator} from "@miniskylab/antimatter-decorator";
import {CalendarComponent} from "./calendar-component";
import {CalendarComponentProps} from "./models/calendar-component-props";
import {CalendarExporter} from "./models/calendar-exporter";

export const CalendarComponentName = Decorator.getValue<string>(ComponentName, CalendarComponentProps);

export {CalendarComponent};
export {CalendarComponentProps};

export {CalendarVariant} from "./variants";
export type {CalendarExportProps as CalendarProps} from "./models/calendar-export-props";
export const Calendar = new CalendarExporter().export(CalendarComponent);
