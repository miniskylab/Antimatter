import {ComponentExporter, CSS, Enum} from "@miniskylab/antimatter/infrastructures";
import {ClassConstructor} from "class-transformer";
import {DatePickerVariant, DefaultDatePickerVariant} from "../variants";
import {DatePickerComponentProps} from "./date-picker-component-props";
import {DatePickerExportProps} from "./date-picker-export-props";

export class DatePickerExporter extends ComponentExporter<DatePickerExportProps>
{
    protected get PropsType(): ClassConstructor<DatePickerComponentProps>
    {
        return DatePickerComponentProps;
    }

    protected get DefaultProps(): Partial<DatePickerComponentProps>
    {
        return {
            autoFocus: false,
            defaultSelectedDate: undefined,
            placeholderText: String.EMPTY,
            disableTyping: undefined,
            onBlur: undefined,
            onFocus: undefined,
            onPointerDown: undefined,
            onKeyDown: undefined,
            onChange: undefined
        };
    }

    protected deserialize(datePickerExportProps: DatePickerExportProps): DatePickerExportProps
    {
        return {
            ...datePickerExportProps,
            defaultSelectedDate: Date.deserialize(datePickerExportProps.defaultSelectedDate)
        };
    }

    protected getVariant(datePickerExportProps: DatePickerExportProps): CSS
    {
        switch (Enum.getValue(DatePickerVariant, datePickerExportProps.variant))
        {
            case null:
            case undefined:
            case DatePickerVariant.Default:
                return DefaultDatePickerVariant;

            default:
                return datePickerExportProps.variant as CSS;
        }
    }
}
