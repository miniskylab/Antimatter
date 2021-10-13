import {ComponentExporter, CSS, Enum} from "@miniskylab/antimatter/infrastructure";
import {ClassConstructor} from "class-transformer";
import {DefaultNumericInputFieldVariant, NumericInputFieldVariant} from "../variants";
import {NumericInputFieldComponentProps} from "./numeric-input-field-component-props";
import {NumericInputFieldExportProps} from "./numeric-input-field-export-props";

export class NumericInputFieldExporter extends ComponentExporter<NumericInputFieldExportProps>
{
    protected get PropsType(): ClassConstructor<NumericInputFieldComponentProps>
    {
        return NumericInputFieldComponentProps;
    }

    protected get DefaultProps(): Partial<NumericInputFieldComponentProps>
    {
        return {
            autoFocus: false,
            defaultValue: undefined,
            minValue: Number.MIN,
            maxValue: Number.MAX,
            maximumFractionDigits: 20,
            maximumDigitCount: Number.MAX,
            placeholderText: String.EMPTY,
            showPlusSymbolForPositiveNumber: false,
            onBlur: undefined,
            onFocus: undefined,
            onPointerDown: undefined,
            onKeyDown: undefined,
            onChange: undefined
        };
    }

    protected deserialize(numericInputFieldExportProps: NumericInputFieldExportProps): NumericInputFieldExportProps
    {
        return {
            ...numericInputFieldExportProps
        };
    }

    protected getVariant(numericInputFieldExportProps: NumericInputFieldExportProps): CSS
    {
        switch (Enum.getValue(NumericInputFieldVariant, numericInputFieldExportProps.variant))
        {
            case null:
            case undefined:
            case NumericInputFieldVariant.Default:
                return DefaultNumericInputFieldVariant;

            default:
                return numericInputFieldExportProps.variant as CSS;
        }
    }
}
