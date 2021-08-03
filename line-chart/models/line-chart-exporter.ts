import {ComponentExporter, CSS, Enum} from "antimatter/infrastructures";
import {ClassConstructor} from "class-transformer";
import {DefaultLineChartVariant, LineChartVariant} from "../variants";
import {LineChartComponentProps} from "./line-chart-component-props";
import {LineChartExportProps} from "./line-chart-export-props";

export class LineChartExporter extends ComponentExporter<LineChartExportProps>
{
    protected get PropsType(): ClassConstructor<LineChartComponentProps>
    {
        return LineChartComponentProps;
    }

    protected get DefaultProps(): Partial<LineChartComponentProps>
    {
        return {
            dataX: [],
            dataY: []
        };
    }

    protected deserialize(lineChartExportProps: LineChartExportProps): LineChartExportProps
    {
        return {
            ...lineChartExportProps
        };
    }

    protected getVariant(lineChartExportProps: LineChartExportProps): CSS
    {
        switch (Enum.getValue(LineChartVariant, lineChartExportProps.variant))
        {
            case null:
            case undefined:
            case LineChartVariant.Default:
                return DefaultLineChartVariant;

            default:
                return lineChartExportProps.variant as CSS;
        }
    }
}
