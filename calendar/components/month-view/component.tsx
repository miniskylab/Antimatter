import {Button} from "@miniskylab/antimatter-button";
import {bem} from "@miniskylab/antimatter-model";
import {GregorianCalendar} from "@miniskylab/antimatter-typescript";
import React from "react";
import {Props} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class Component extends React.Component<Props>
{
    static defaultProps: Partial<Props> = {};

    render(): JSX.Element
    {
        return (
            <div className={bem(this.props.className)}>
                {this.renderGrid()}
            </div>
        );
    }

    private renderGrid(): JSX.Element[]
    {
        const monthGrid: JSX.Element[] = [];
        const month = new Date(this.props.displayingYear, 0, 1);
        for (let monthIndex = 0; monthIndex < GregorianCalendar.MONTH_COUNT_IN_YEAR; monthIndex++)
        {
            month.setMonth(monthIndex);
            monthGrid.push(this.renderGridCell(new Date(month)));
        }

        if (this.props.displayingYear < GregorianCalendar.MAX_YEAR)
        {
            monthGrid.push(this.renderGridCell(new Date(this.props.displayingYear + 1, 0, 1)));
            monthGrid.push(this.renderGridCell(new Date(this.props.displayingYear + 1, 1, 1)));
            monthGrid.push(this.renderGridCell(new Date(this.props.displayingYear + 1, 2, 1)));
            monthGrid.push(this.renderGridCell(new Date(this.props.displayingYear + 1, 3, 1)));
        }
        else
        {
            monthGrid.unshift(this.renderGridCell(new Date(this.props.displayingYear - 1, 11, 1)));
            monthGrid.unshift(this.renderGridCell(new Date(this.props.displayingYear - 1, 10, 1)));
            monthGrid.unshift(this.renderGridCell(new Date(this.props.displayingYear - 1, 9, 1)));
            monthGrid.unshift(this.renderGridCell(new Date(this.props.displayingYear - 1, 8, 1)));
        }

        return monthGrid;
    }

    private renderGridCell(month: Date): JSX.Element
    {
        const modifier = GregorianCalendar.isEqualMonth(month, this.props.selectedMonth)
            ? "Selected"
            : month.getFullYear() !== this.props.displayingYear
                ? "Extraneous"
                : String.EMPTY;

        return (
            <Button
                key={`${month.getMonth()}${month.getFullYear()}`}
                className={bem("Calendar-MonthView-GridCell", null, modifier)}
                label={GregorianCalendar.getShortMonthName(month.getMonth())}
                onClick={() => { this.props.onMonthClick(new Date(month)); }}
            />
        );
    }
}
