import {ComponentExporter, CSS, Enum} from "@miniskylab/antimatter/infrastructure";
import {ClassConstructor} from "class-transformer";
import {DateViewVariant, DefaultDateViewVariant, MiniDateViewVariant, SesquialteralDateViewVariant} from "../variants";
import {DateViewComponentProps} from "./date-view-component-props";
import {DateViewExportProps} from "./date-view-export-props";

export class DateViewExporter extends ComponentExporter<DateViewExportProps>
{
    private readonly today: Date;

    constructor()
    {
        super();
        this.today = new Date();
    }

    protected get PropsType(): ClassConstructor<DateViewComponentProps>
    {
        return DateViewComponentProps;
    }

    protected get DefaultProps(): Partial<DateViewComponentProps>
    {
        return {
            selectedDate: undefined,
            displayingMonth: this.today,
            highlightedDates: [],
            onDateClicked: undefined
        };
    }

    protected deserialize(dateViewExportedProps: DateViewExportProps): DateViewExportProps
    {
        return {
            ...dateViewExportedProps,
            selectedDate: Date.deserialize(dateViewExportedProps.selectedDate),
            displayingMonth: Date.deserialize(dateViewExportedProps.displayingMonth)
        };
    }

    protected getVariant(dateViewExportedProps: DateViewExportProps): CSS
    {
        switch (Enum.getValue(DateViewVariant, dateViewExportedProps.variant))
        {
            case DateViewVariant.Mini:
                return MiniDateViewVariant;

            case null:
            case undefined:
            case DateViewVariant.Default:
                return DefaultDateViewVariant;

            case DateViewVariant.Sesquialteral:
                return SesquialteralDateViewVariant;

            default:
                return dateViewExportedProps.variant as CSS;
        }
    }
}
