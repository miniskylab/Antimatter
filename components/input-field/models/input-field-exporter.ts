import {ComponentExporter, ComponentStyles} from "@miniskylab/antimatter-component";
import {Enum} from "@miniskylab/antimatter-typescript";
import {ClassConstructor} from "class-transformer";
import {DefaultInputFieldVariant, InputFieldVariant} from "../variants";
import {InputFieldComponentProps} from "./input-field-component-props";
import {InputFieldExportProps} from "./input-field-export-props";

export class InputFieldExporter extends ComponentExporter<InputFieldExportProps>
{
    protected get PropsType(): ClassConstructor<InputFieldComponentProps>
    {
        return InputFieldComponentProps;
    }

    protected get DefaultProps(): Partial<InputFieldComponentProps>
    {
        return {
            autoFocus: false,
            value: String.EMPTY,
            placeholderText: String.EMPTY,
            isPasswordField: false,
            onBlur: undefined,
            onFocus: undefined,
            onPointerDown: undefined,
            onKeyDown: undefined,
            onChange: undefined
        };
    }

    protected deserialize(inputFieldExportProps: InputFieldExportProps): InputFieldExportProps
    {
        return {
            ...inputFieldExportProps
        };
    }

    protected getVariant(inputFieldExportProps: InputFieldExportProps): ComponentStyles
    {
        switch (Enum.getValue(InputFieldVariant, inputFieldExportProps.variant))
        {
            case null:
            case undefined:
            case InputFieldVariant.Default:
                return DefaultInputFieldVariant;

            default:
                return inputFieldExportProps.variant as ComponentStyles;
        }
    }
}
