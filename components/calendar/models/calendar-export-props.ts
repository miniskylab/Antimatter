import {ComponentExportProps, ComponentStyles} from "@miniskylab/antimatter-component";
import {Modify} from "@miniskylab/antimatter-typescript";
import {ControlsVariant} from "../components/controls";
import {DateViewVariant} from "../components/date-view";
import {HeaderVariant} from "../components/header";
import {MonthViewVariant} from "../components/month-view";
import {YearViewVariant} from "../components/year-view";
import {CalendarVariant} from "../variants";
import {CalendarComponentProps} from "./calendar-component-props";
import {CalendarComponentVariant} from "./calendar-component-variant";

export type CalendarExportProps = ComponentExportProps<CalendarComponentProps, CalendarVariant, {
    readonly componentVariant?: Modify<CalendarComponentVariant, {
        readonly header?: HeaderVariant | ComponentStyles | string;
        readonly dateView?: DateViewVariant | ComponentStyles | string;
        readonly monthView?: MonthViewVariant | ComponentStyles | string;
        readonly yearView?: YearViewVariant | ComponentStyles | string;
        readonly controls?: ControlsVariant | ComponentStyles | string;
    }>;
    readonly selectedDate?: Date | string | number;
}>;
