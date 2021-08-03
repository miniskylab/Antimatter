import {ComponentExporter, CSS, Enum} from "antimatter/infrastructures";
import {ClassConstructor} from "class-transformer";
import {DefaultSpacerVariant, SpacerVariant} from "../variants";
import {SpacerComponentProps} from "./spacer-component-props";
import {SpacerExportProps} from "./spacer-export-props";

export class SpacerExporter extends ComponentExporter<SpacerExportProps>
{
    protected get PropsType(): ClassConstructor<SpacerComponentProps>
    {
        return SpacerComponentProps;
    }

    protected get DefaultProps(): Partial<SpacerComponentProps>
    {
        return {};
    }

    protected deserialize(spacerExportProps: SpacerExportProps): SpacerExportProps
    {
        return {
            ...spacerExportProps
        };
    }

    protected getVariant(spacerExportProps: SpacerExportProps): CSS
    {
        switch (Enum.getValue(SpacerVariant, spacerExportProps.variant))
        {
            case null:
            case undefined:
            case SpacerVariant.Default:
                return DefaultSpacerVariant;

            default:
                return spacerExportProps.variant as CSS;
        }
    }
}
