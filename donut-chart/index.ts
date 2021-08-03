import {ComponentName, Decorator} from "antimatter/infrastructures";
import {DonutChartComponent} from "./donut-chart-component";
import {DonutChartComponentProps} from "./models/donut-chart-component-props";
import {DonutChartExporter} from "./models/donut-chart-exporter";

export const DonutChartComponentName = Decorator.getValue(ComponentName, DonutChartComponentProps) as string;

export {DonutChartComponent};
export {DonutChartComponentProps};

export {DonutChartVariant} from "./variants";
export type {DonutChartExportProps as DonutChartProps} from "./models/donut-chart-export-props";
export const DonutChart = new DonutChartExporter().export(DonutChartComponent);
