import {CSS, Export, Modify} from "@miniskylab/antimatter/infrastructure";
import {ControlsVariant} from "../components/controls";
import {DateViewVariant} from "../components/date-view";
import {HeaderVariant} from "../components/header";
import {MonthViewVariant} from "../components/month-view";
import {YearViewVariant} from "../components/year-view";
import {CalendarVariant} from "../variants";
import {CalendarComponentProps} from "./calendar-component-props";
import {CalendarComponentVariant} from "./calendar-component-variant";

export type CalendarExportProps = Export<CalendarComponentProps, CalendarVariant, {
    readonly componentVariant?: Modify<CalendarComponentVariant, {
        readonly header?: HeaderVariant | CSS | string;
        readonly dateView?: DateViewVariant | CSS | string;
        readonly monthView?: MonthViewVariant | CSS | string;
        readonly yearView?: YearViewVariant | CSS | string;
        readonly controls?: ControlsVariant | CSS | string;
    }>;
    readonly selectedDate?: Date | string | number;
}>;
