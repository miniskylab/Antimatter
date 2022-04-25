import {DonutChart as DonutChartComponent} from "@miniskylab/antimatter-donut-chart";
import {DonutChartDeserializerCreator} from "./deserializer-creator";

export const DonutChart = new DonutChartDeserializerCreator().createFrom(DonutChartComponent);
export {Props} from "./model";
