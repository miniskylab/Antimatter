import {ComponentExporter, CSS, Enum} from "antimatter/infrastructures";
import {ClassConstructor} from "class-transformer";
import {DefaultLabelVariant, LabelVariant} from "../variants";
import {LabelComponentProps} from "./label-component-props";
import {LabelExportProps} from "./label-export-props";

export class LabelExporter extends ComponentExporter<LabelExportProps>
{
    protected get PropsType(): ClassConstructor<LabelComponentProps>
    {
        return LabelComponentProps;
    }

    protected get DefaultProps(): Partial<LabelComponentProps>
    {
        return {};
    }

    protected deserialize(labelExportProps: LabelExportProps): LabelExportProps
    {
        return {
            ...labelExportProps
        };
    }

    protected getVariant(labelExportProps: LabelExportProps): CSS
    {
        switch (Enum.getValue(LabelVariant, labelExportProps.variant))
        {
            case null:
            case undefined:
            case LabelVariant.Default:
                return DefaultLabelVariant;

            default:
                return labelExportProps.variant as CSS;
        }
    }
}
