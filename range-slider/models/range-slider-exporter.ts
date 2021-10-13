import {ComponentExporter, CSS, Enum} from "@miniskylab/antimatter/infrastructure";
import {ClassConstructor} from "class-transformer";
import {DefaultRangeSliderVariant, RangeSliderVariant} from "../variants";
import {RangeSliderComponentProps} from "./range-slider-component-props";
import {RangeSliderExportProps} from "./range-slider-export-props";

export class RangeSliderExporter extends ComponentExporter<RangeSliderExportProps>
{
    protected get PropsType(): ClassConstructor<RangeSliderComponentProps>
    {
        return RangeSliderComponentProps;
    }

    protected get DefaultProps(): Partial<RangeSliderComponentProps>
    {
        return {
            value: undefined,
            minValue: undefined,
            maxValue: undefined,
            pipSettings: undefined,
            canInteractWith: true,
            onChange: undefined
        };
    }

    protected deserialize(rangeSliderExportProps: RangeSliderExportProps): RangeSliderExportProps
    {
        return {
            ...rangeSliderExportProps
        };
    }

    protected getVariant(rangeSliderExportProps: RangeSliderExportProps): CSS
    {
        switch (Enum.getValue(RangeSliderVariant, rangeSliderExportProps.variant))
        {
            case null:
            case undefined:
            case RangeSliderVariant.Default:
                return DefaultRangeSliderVariant;

            default:
                return rangeSliderExportProps.variant as CSS;
        }
    }
}
