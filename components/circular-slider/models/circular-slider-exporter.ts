import {ComponentExporter, ComponentStyles} from "@miniskylab/antimatter-component";
import {Enum} from "@miniskylab/antimatter-typescript";
import {ClassConstructor} from "class-transformer";
import {CircularSliderVariant, DefaultCircularSliderVariant} from "../variants";
import {CircularSliderComponentProps} from "./circular-slider-component-props";
import {CircularSliderExportProps} from "./circular-slider-export-props";

export class CircularSliderExporter extends ComponentExporter<CircularSliderExportProps>
{
    protected get PropsType(): ClassConstructor<CircularSliderComponentProps>
    {
        return CircularSliderComponentProps;
    }

    protected get DefaultProps(): Partial<CircularSliderComponentProps>
    {
        return {
            startValue: 0,
            endValue: 0,
            pipSettings: undefined,
            onChange: undefined,
            onPointerUp: undefined
        };
    }

    protected deserialize(circularSliderExportProps: CircularSliderExportProps): CircularSliderExportProps
    {
        return {
            ...circularSliderExportProps
        };
    }

    protected getVariant(circularSliderExportProps: CircularSliderExportProps): ComponentStyles
    {
        switch (Enum.getValue(CircularSliderVariant, circularSliderExportProps.variant))
        {
            case null:
            case undefined:
            case CircularSliderVariant.Default:
                return DefaultCircularSliderVariant;

            default:
                return circularSliderExportProps.variant as ComponentStyles;
        }
    }
}
