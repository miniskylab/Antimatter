import {ComponentExporter, ComponentStyles} from "@miniskylab/antimatter-component";
import {Enum} from "@miniskylab/antimatter-typescript";
import {ClassConstructor} from "class-transformer";
import {CircularPipsVariant, HorizontalPipsVariant, PipsVariant} from "../variants";
import {PipsComponentProps} from "./pips-component-props";
import {PipsExportProps} from "./pips-export-props";
import {PipsShape} from "./pips-shape";

export class PipsExporter extends ComponentExporter<PipsExportProps>
{
    protected get PropsType(): ClassConstructor<PipsComponentProps>
    {
        return PipsComponentProps;
    }

    protected get DefaultProps(): Partial<PipsComponentProps>
    {
        return {
            startValue: undefined,
            endValue: undefined,
            milestoneStep: undefined,
            shape: PipsShape.HorizontalBar
        };
    }

    protected deserialize(pipsExportProps: PipsExportProps): PipsExportProps
    {
        return {
            ...pipsExportProps,
            shape: Enum.getValue(PipsShape, pipsExportProps.shape)
        };
    }

    protected getVariant(pipsExportProps: PipsExportProps): ComponentStyles
    {
        switch (Enum.getValue(PipsVariant, pipsExportProps.variant))
        {
            case null:
            case undefined:
            case PipsVariant.Default:
                return pipsExportProps.shape === PipsShape.Circle
                    ? CircularPipsVariant
                    : HorizontalPipsVariant;

            default:
                return pipsExportProps.variant as ComponentStyles;
        }
    }
}
