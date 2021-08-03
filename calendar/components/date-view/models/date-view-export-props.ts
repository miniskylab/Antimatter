import {Export} from "antimatter/infrastructures";
import {DateViewVariant} from "../variants";
import {DateViewComponentProps} from "./date-view-component-props";

export type DateViewExportProps = Export<DateViewComponentProps, DateViewVariant, {
    readonly selectedDate?: Date | string;
    readonly displayingMonth?: Date | string;
}>;
