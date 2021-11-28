import {ComponentName} from "@miniskylab/antimatter-component";
import {Decorator} from "@miniskylab/antimatter-decorator";
import {DonutChartComponent} from "./donut-chart-component";
import {DonutChartComponentProps} from "./models/donut-chart-component-props";
import {DonutChartExporter} from "./models/donut-chart-exporter";

export const DonutChartComponentName = Decorator.getValue<string>(ComponentName, DonutChartComponentProps);

export {DonutChartComponent};
export {DonutChartComponentProps};

export {DonutChartVariant} from "./variants";
export type {DonutChartExportProps as DonutChartProps} from "./models/donut-chart-export-props";
export const DonutChart = new DonutChartExporter().export(DonutChartComponent);
