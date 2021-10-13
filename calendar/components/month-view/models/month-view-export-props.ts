import {Export} from "@miniskylab/antimatter/infrastructure";
import {MonthViewVariant} from "../variants";
import {MonthViewComponentProps} from "./month-view-component-props";

export type MonthViewExportProps = Export<MonthViewComponentProps, MonthViewVariant, {
    readonly selectedMonth?: Date | string;
}>;
