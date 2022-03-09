import {ComponentExporter, ComponentStyles} from "@miniskylab/antimatter-component";
import {Enum} from "@miniskylab/antimatter-typescript";
import {ClassConstructor} from "class-transformer";
import {DefaultPanelVariant, PanelVariant} from "../variants";
import {PanelComponentProps} from "./panel-component-props";
import {PanelExportProps} from "./panel-export-props";

export class PanelExporter extends ComponentExporter<PanelExportProps>
{
    protected get PropsType(): ClassConstructor<PanelComponentProps>
    {
        return PanelComponentProps;
    }

    protected get DefaultProps(): Partial<PanelComponentProps>
    {
        return {
            title: String.EMPTY,
            children: undefined
        };
    }

    protected deserialize(panelExportProps: PanelExportProps): PanelExportProps
    {
        return {
            ...panelExportProps
        };
    }

    protected getVariant(panelExportProps: PanelExportProps): ComponentStyles
    {
        switch (Enum.getValue(PanelVariant, panelExportProps.variant))
        {
            case null:
            case undefined:
            case PanelVariant.Default:
                return DefaultPanelVariant;

            default:
                return panelExportProps.variant as ComponentStyles;
        }
    }
}