import {ComponentExportProps} from "@miniskylab/antimatter-component";
import {Decade} from "@miniskylab/antimatter-typescript";
import {YearViewVariant} from "../variants";
import {YearViewComponentProps} from "./year-view-component-props";

export type YearViewExportProps = ComponentExportProps<YearViewComponentProps, YearViewVariant, {
    readonly displayingDecade?: Decade | number;
}>;
