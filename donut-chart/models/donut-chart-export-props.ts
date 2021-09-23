import {Export} from "@miniskylab/antimatter/infrastructures";
import {DonutChartVariant} from "../variants";
import {DonutChartComponentProps} from "./donut-chart-component-props";

export type DonutChartExportProps = Export<DonutChartComponentProps, DonutChartVariant>;
