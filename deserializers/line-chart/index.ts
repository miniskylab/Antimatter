import {LineChart as LineChartComponent} from "@miniskylab/antimatter-line-chart";
import {LineChartDeserializerCreator} from "./deserializer-creator";

export const LineChart = new LineChartDeserializerCreator().createFrom(LineChartComponent);
export {Props} from "./model";
