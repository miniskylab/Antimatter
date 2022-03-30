import {ComponentExporter, ComponentStyles} from "@miniskylab/antimatter-component";
import {Enum} from "@miniskylab/antimatter-typescript";
import {ClassConstructor} from "class-transformer";
import {ControlsVariant, DefaultControlsVariant, MiniControlsVariant, SesquialteralControlsVariant} from "../variants";
import {ControlsComponentProps} from "./controls-component-props";
import {ControlsExportProps} from "./controls-export-props";

export class ControlsExporter extends ComponentExporter<ControlsExportProps>
{
    protected get PropsType(): ClassConstructor<ControlsComponentProps>
    {
        return ControlsComponentProps;
    }

    protected get DefaultProps(): Partial<ControlsComponentProps>
    {
        return {
            onTodayButtonClick: undefined,
            onSelectionButtonClick: undefined
        };
    }

    protected deserialize(controlsExportProps: ControlsExportProps): ControlsExportProps
    {
        return {
            ...controlsExportProps
        };
    }

    protected getVariant(controlsExportProps: ControlsExportProps): ComponentStyles
    {
        switch (Enum.getValue(ControlsVariant, controlsExportProps.variant))
        {
            case ControlsVariant.Mini:
                return MiniControlsVariant;

            case null:
            case undefined:
            case ControlsVariant.Default:
                return DefaultControlsVariant;

            case ControlsVariant.Sesquialteral:
                return SesquialteralControlsVariant;

            default:
                return controlsExportProps.variant as ComponentStyles;
        }
    }
}
