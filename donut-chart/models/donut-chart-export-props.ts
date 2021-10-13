import {Export} from "@miniskylab/antimatter/infrastructure";
import {DonutChartVariant} from "../variants";
import {DonutChartComponentProps} from "./donut-chart-component-props";

export type DonutChartExportProps = Export<DonutChartComponentProps, DonutChartVariant>;
