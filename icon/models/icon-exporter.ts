import {ComponentExporter, CSS, Enum} from "@miniskylab/antimatter/infrastructures";
import {ClassConstructor} from "class-transformer";
import {DefaultIconVariant, IconVariant} from "../variants";
import {IconComponentProps} from "./icon-component-props";
import {IconExportProps} from "./icon-export-props";
import {IconName} from "./icon-name";

export class IconExporter extends ComponentExporter<IconExportProps>
{
    protected get PropsType(): ClassConstructor<IconComponentProps>
    {
        return IconComponentProps;
    }

    protected get DefaultProps(): Partial<IconComponentProps>
    {
        return {
            className: String.EMPTY,
            iconName: undefined,
            style: undefined,
            onClick: undefined,
            onPointerDown: undefined
        };
    }

    protected deserialize(iconExportProps: IconExportProps): IconExportProps
    {
        return {
            ...iconExportProps,
            iconName: Enum.getValue(IconName, iconExportProps.iconName)
        };
    }

    protected getVariant(iconExportProps: IconExportProps): CSS
    {
        switch (Enum.getValue(IconVariant, iconExportProps.variant))
        {
            case null:
            case undefined:
            case IconVariant.Default:
                return DefaultIconVariant;

            default:
                return iconExportProps.variant as CSS;
        }
    }
}
