import {ComponentExporter, ComponentStyles} from "@miniskylab/antimatter-component";
import {IconName} from "@miniskylab/antimatter-icon";
import {Enum} from "@miniskylab/antimatter-typescript";
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

    protected getVariant(buttonExportProps: ButtonExportProps): ComponentStyles
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
                return buttonExportProps.variant as ComponentStyles;
        }
    }
}
