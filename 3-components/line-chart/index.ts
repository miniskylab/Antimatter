import {ComponentName} from "@miniskylab/antimatter-component";
import {Decorator} from "@miniskylab/antimatter-decorator";
import {LineChartComponent} from "./line-chart-component";
import {LineChartComponentProps} from "./models/line-chart-component-props";
import {LineChartExporter} from "./models/line-chart-exporter";

export const LineChartComponentName = Decorator.getValue<string>(ComponentName, LineChartComponentProps);

export {LineChartComponent};
export {LineChartComponentProps};

export {LineChartVariant} from "./variants";
export {LineChartLineStyle} from "./models/line-chart-line-style";
export type {LineChartExportProps as LineChartProps} from "./models/line-chart-export-props";
export const LineChart = new LineChartExporter().export(LineChartComponent);
