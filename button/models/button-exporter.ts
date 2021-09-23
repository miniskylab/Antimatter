import {IconName} from "@miniskylab/antimatter/icon";
import {ComponentExporter, CSS, Enum} from "@miniskylab/antimatter/infrastructures";
import {ClassConstructor} from "class-transformer";
import {ButtonVariant, OutlinedCircularButtonVariant, OutlinedRectangleButtonVariant, SolidRectangleButtonVariant} from "../variants";
import {ButtonComponentProps} from "./button-component-props";
import {ButtonExportProps} from "./button-export-props";
import {ButtonTarget} from "./button-target";

export class ButtonExporter extends ComponentExporter<ButtonExportProps>
{
    protected get PropsType(): ClassConstructor<ButtonComponentProps>
    {
        return ButtonComponentProps;
    }

    protected get DefaultProps(): Partial<ButtonComponentProps>
    {
        return {
            href: undefined,
            text: String.EMPTY,
            icon: undefined,
            target: ButtonTarget.SameFrame,
            download: undefined,
            disabled: false,
            onClick: undefined
        };
    }

    protected deserialize(buttonExportProps: ButtonExportProps): ButtonExportProps
    {
        return {
            ...buttonExportProps,
            icon: Enum.getValue(IconName, buttonExportProps.icon),
            target: Enum.getValue(ButtonTarget, buttonExportProps.target)
        };
    }

    protected getVariant(buttonExportProps: ButtonExportProps): CSS
    {
        switch (Enum.getValue(ButtonVariant, buttonExportProps.variant))
        {
            case null:
            case undefined:
                return buttonExportProps.text
                    ? OutlinedRectangleButtonVariant
                    : OutlinedCircularButtonVariant;

            case ButtonVariant.OutlinedCircular:
                return OutlinedCircularButtonVariant;

            case ButtonVariant.OutlinedRectangle:
                return OutlinedRectangleButtonVariant;

            case ButtonVariant.SolidRectangle:
                return SolidRectangleButtonVariant;

            default:
                return buttonExportProps.variant as CSS;
        }
    }
}
