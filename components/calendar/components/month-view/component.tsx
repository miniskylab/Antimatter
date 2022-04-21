import {GregorianCalendar} from "@miniskylab/antimatter-typescript";
import React from "react";
import {Props} from "./models/props";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class Component extends React.Component<Props>
{
    static defaultProps: Partial<Props> = {
        variant: Variant.Default
    };

    render(): JSX.Element
    {
        return (
            <div className={this.props.variant["month-view"]}>
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
            ? "--selected"
            : month.getFullYear() !== this.props.displayingYear
                ? "--extraneous"
                : String.EMPTY;

        return (
            <div
                key={`${month.getMonth()}${month.getFullYear()}`}
                onClick={(): void => { this.props.onMonthClick(new Date(month)); }}
                className={this.props.variant[`month-view__grid-cell${modifier}`]}
            >
                {GregorianCalendar.getShortMonthName(month.getMonth())}
            </div>
        );
    }
}
