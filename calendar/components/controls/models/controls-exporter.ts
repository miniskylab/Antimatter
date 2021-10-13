import {ComponentExporter, CSS, Enum} from "@miniskylab/antimatter/infrastructure";
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
            onTodayButtonClicked: undefined,
            onSelectionButtonClicked: undefined
        };
    }

    protected deserialize(controlsExportProps: ControlsExportProps): ControlsExportProps
    {
        return {
            ...controlsExportProps
        };
    }

    protected getVariant(controlsExportProps: ControlsExportProps): CSS
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
                return controlsExportProps.variant as CSS;
        }
    }
}
