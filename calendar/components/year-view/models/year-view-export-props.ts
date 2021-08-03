import {Decade} from "antimatter/date-time";
import {Export} from "antimatter/infrastructures";
import {YearViewVariant} from "../variants";
import {YearViewComponentProps} from "./year-view-component-props";

export type YearViewExportProps = Export<YearViewComponentProps, YearViewVariant, {
    readonly displayingDecade?: Decade | number;
}>;
