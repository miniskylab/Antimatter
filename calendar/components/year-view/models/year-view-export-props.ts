import {Decade} from "@miniskylab/antimatter/date-time";
import {Export} from "@miniskylab/antimatter/infrastructure";
import {YearViewVariant} from "../variants";
import {YearViewComponentProps} from "./year-view-component-props";

export type YearViewExportProps = Export<YearViewComponentProps, YearViewVariant, {
    readonly displayingDecade?: Decade | number;
}>;
