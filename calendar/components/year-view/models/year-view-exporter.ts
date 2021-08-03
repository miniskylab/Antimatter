import {GregorianCalendar} from "antimatter/date-time";
import {ComponentExporter, CSS, Enum} from "antimatter/infrastructures";
import {ClassConstructor} from "class-transformer";
import {DefaultYearViewVariant, MiniYearViewVariant, SesquialteralYearViewVariant, YearViewVariant} from "../variants";
import {YearViewComponentProps} from "./year-view-component-props";
import {YearViewExportProps} from "./year-view-export-props";

export class YearViewExporter extends ComponentExporter<YearViewExportProps>
{
    private readonly today: Date;

    constructor()
    {
        super();
        this.today = new Date();
    }

    protected get PropsType(): ClassConstructor<YearViewComponentProps>
    {
        return YearViewComponentProps;
    }

    protected get DefaultProps(): Partial<YearViewComponentProps>
    {
        return {
            selectedYear: this.today.getFullYear(),
            displayingDecade: GregorianCalendar.getDecade(this.today.getFullYear()),
            onYearClicked: undefined
        };
    }

    protected deserialize(yearViewExportProps: YearViewExportProps): YearViewExportProps
    {
        return {
            ...yearViewExportProps
        };
    }

    protected getVariant(yearViewExportProps: YearViewExportProps): CSS
    {
        switch (Enum.getValue(YearViewVariant, yearViewExportProps.variant))
        {
            case YearViewVariant.Mini:
                return MiniYearViewVariant;

            case null:
            case undefined:
            case YearViewVariant.Default:
                return DefaultYearViewVariant;

            case YearViewVariant.Sesquialteral:
                return SesquialteralYearViewVariant;

            default:
                return yearViewExportProps.variant as CSS;
        }
    }
}
