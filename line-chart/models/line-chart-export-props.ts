import {Export} from "@miniskylab/antimatter/infrastructure";
import {LineChartVariant} from "../variants";
import {LineChartComponentProps} from "./line-chart-component-props";

export type LineChartExportProps = Export<LineChartComponentProps, LineChartVariant>;
