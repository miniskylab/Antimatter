import {ComponentExporter, ComponentStyles} from "@miniskylab/antimatter-component";
import {Enum} from "@miniskylab/antimatter-typescript";
import {ClassConstructor} from "class-transformer";
import {ComponentType, createElement} from "react";
import {CalendarVariant, DefaultCalendarVariant, MiniCalendarVariant, SesquialteralCalendarVariant} from "../variants";
import {CalendarComponentProps} from "./calendar-component-props";
import {CalendarExportProps} from "./calendar-export-props";

export class CalendarExporter extends ComponentExporter<CalendarExportProps>
{
    protected get PropsType(): ClassConstructor<CalendarComponentProps>
    {
        return CalendarComponentProps;
    }

    protected get DefaultProps(): Partial<CalendarComponentProps>
    {
        return {
            componentVariant: {
                header: undefined,
                dateView: undefined,
                monthView: undefined,
                yearView: undefined,
                controls: undefined
            },
            selectedDate: undefined,
            onChange: undefined,
            onBlur: undefined
        };
    }

    protected getHigherOrderComponents(): ((calendarComponent: ComponentType<CalendarExportProps>) => ComponentType<CalendarExportProps>)[]
    {
        return [this.autoDetectComponentVariant];
    }

    protected deserialize(calendarExportProps: CalendarExportProps): CalendarExportProps
    {
        return {
            ...calendarExportProps,
            selectedDate: Date.deserialize(calendarExportProps.selectedDate)
        };
    }

    protected getVariant(calendarExportProps: CalendarExportProps): ComponentStyles
    {
        switch (Enum.getValue(CalendarVariant, calendarExportProps.variant))
        {
            case CalendarVariant.Mini:
                return MiniCalendarVariant;

            case null:
            case undefined:
            case CalendarVariant.Default:
                return DefaultCalendarVariant;

            case CalendarVariant.Sesquialteral:
                return SesquialteralCalendarVariant;

            default:
                return calendarExportProps.variant as ComponentStyles;
        }
    }

    private autoDetectComponentVariant(calendarComponent: ComponentType<CalendarExportProps>): ComponentType<CalendarExportProps>
    {
        return function _(calendarExportProps: CalendarExportProps): JSX.Element
        {
            const calendarVariantName = Enum.getName(CalendarVariant, calendarExportProps.variant);
            calendarExportProps = {
                ...calendarExportProps,
                componentVariant: {
                    header: calendarExportProps.componentVariant?.header || calendarVariantName,
                    dateView: calendarExportProps.componentVariant?.dateView || calendarVariantName,
                    monthView: calendarExportProps.componentVariant?.monthView || calendarVariantName,
                    yearView: calendarExportProps.componentVariant?.yearView || calendarVariantName,
                    controls: calendarExportProps.componentVariant?.controls || calendarVariantName
                }
            };

            return createElement(calendarComponent, calendarExportProps);
        }.bind(this);
    }
}
