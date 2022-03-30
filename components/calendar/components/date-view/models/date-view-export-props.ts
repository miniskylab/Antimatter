import {ComponentExportProps} from "@miniskylab/antimatter-component";
import {DateViewVariant} from "../variants";
import {DateViewComponentProps} from "./date-view-component-props";

export type DateViewExportProps = ComponentExportProps<DateViewComponentProps, DateViewVariant, {
    readonly selectedDate?: Date | string;
    readonly displayingMonth?: Date | string;
}>;
