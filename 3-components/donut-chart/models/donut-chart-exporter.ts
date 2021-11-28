import {ComponentExporter, ComponentStyles} from "@miniskylab/antimatter-component";
import {Enum} from "@miniskylab/antimatter-typescript";
import {ClassConstructor} from "class-transformer";
import {DefaultDonutChartVariant, DonutChartVariant} from "../variants";
import {DonutChartComponentProps} from "./donut-chart-component-props";
import {DonutChartExportProps} from "./donut-chart-export-props";

export class DonutChartExporter extends ComponentExporter<DonutChartExportProps>
{
    protected get PropsType(): ClassConstructor<DonutChartComponentProps>
    {
        return DonutChartComponentProps;
    }

    protected get DefaultProps(): Partial<DonutChartComponentProps>
    {
        return {
            pctValue: 0,
            description: String.EMPTY
        };
    }

    protected deserialize(donutChartExportProps: DonutChartExportProps): DonutChartExportProps
    {
        return {
            ...donutChartExportProps
        };
    }

    protected getVariant(donutChartExportProps: DonutChartExportProps): ComponentStyles
    {
        switch (Enum.getValue(DonutChartVariant, donutChartExportProps.variant))
        {
            case null:
            case undefined:
            case DonutChartVariant.Default:
                return DefaultDonutChartVariant;

            default:
                return donutChartExportProps.variant as ComponentStyles;
        }
    }
}
