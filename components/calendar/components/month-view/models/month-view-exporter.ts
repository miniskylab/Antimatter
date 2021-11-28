import {ComponentExporter, ComponentStyles} from "@miniskylab/antimatter-component";
import {Enum} from "@miniskylab/antimatter-typescript";
import {ClassConstructor} from "class-transformer";
import {DefaultMonthViewVariant, MiniMonthViewVariant, MonthViewVariant, SesquialteralMonthViewVariant} from "../variants";
import {MonthViewComponentProps} from "./month-view-component-props";
import {MonthViewExportProps} from "./month-view-export-props";

export class MonthViewExporter extends ComponentExporter<MonthViewExportProps>
{
    private readonly today: Date;

    constructor()
    {
        super();
        this.today = new Date();
    }

    protected get PropsType(): ClassConstructor<MonthViewComponentProps>
    {
        return MonthViewComponentProps;
    }

    protected get DefaultProps(): Partial<MonthViewComponentProps>
    {
        return {
            selectedMonth: this.today,
            displayingYear: this.today.getFullYear(),
            onMonthClick: undefined
        };
    }

    protected deserialize(monthViewExportProps: MonthViewExportProps): MonthViewExportProps
    {
        return {
            ...monthViewExportProps,
            selectedMonth: Date.deserialize(monthViewExportProps.selectedMonth)
        };
    }

    protected getVariant(monthViewExportProps: MonthViewExportProps): ComponentStyles
    {
        switch (Enum.getValue(MonthViewVariant, monthViewExportProps.variant))
        {
            case MonthViewVariant.Mini:
                return MiniMonthViewVariant;

            case null:
            case undefined:
            case MonthViewVariant.Default:
                return DefaultMonthViewVariant;

            case MonthViewVariant.Sesquialteral:
                return SesquialteralMonthViewVariant;

            default:
                return monthViewExportProps.variant as ComponentStyles;
        }
    }
}
