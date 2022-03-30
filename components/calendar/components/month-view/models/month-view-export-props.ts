import {ComponentExportProps} from "@miniskylab/antimatter-component";
import {MonthViewVariant} from "../variants";
import {MonthViewComponentProps} from "./month-view-component-props";

export type MonthViewExportProps = ComponentExportProps<MonthViewComponentProps, MonthViewVariant, {
    readonly selectedMonth?: Date | string;
}>;
