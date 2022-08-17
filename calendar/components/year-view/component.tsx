import {Button} from "@miniskylab/antimatter-button";
import {Decade, GregorianCalendar} from "@miniskylab/antimatter-typescript";
import React from "react";
import {Props} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class Component extends React.Component<Props>
{
    static defaultProps: Partial<Props> = {
        className: "year-view"
    };

    render(): JSX.Element
    {
        return (
            <div className={this.props.className}>
                {this.renderGrid()}
            </div>
        );
    }

    private renderGrid(): JSX.Element[]
    {
        const yearGrid: JSX.Element[] = [];
        const nextDecade = (this.props.displayingDecade + GregorianCalendar.YEAR_COUNT_IN_DECADE) as Decade;
        for (let year = this.props.displayingDecade; year < nextDecade; year++)
        {
            yearGrid.push(this.renderGridCell(year, nextDecade));
        }

        yearGrid.unshift(this.renderGridCell(this.props.displayingDecade - 1, nextDecade));
        yearGrid.unshift(this.renderGridCell(this.props.displayingDecade - 2, nextDecade));
        yearGrid.unshift(this.renderGridCell(this.props.displayingDecade - 3, nextDecade));

        yearGrid.push(this.renderGridCell(nextDecade, nextDecade));
        yearGrid.push(this.renderGridCell(nextDecade + 1, nextDecade));
        yearGrid.push(this.renderGridCell(nextDecade + 2, nextDecade));

        return yearGrid;
    }

    private renderGridCell(year: number, nextDecade: Decade): JSX.Element
    {
        const outOfSupportedYearRange = year < GregorianCalendar.MIN_YEAR || GregorianCalendar.MAX_YEAR < year;
        const modifier = outOfSupportedYearRange
            ? "--empty"
            : year === this.props.selectedYear
                ? "--selected"
                : year < this.props.displayingDecade || nextDecade <= year
                    ? "--extraneous"
                    : String.EMPTY;

        return (
            <Button
                key={year}
                className={`${this.props.className}__grid-cell${modifier}`}
                label={outOfSupportedYearRange ? String.EMPTY : year.toString()}
                onClick={outOfSupportedYearRange ? undefined : (): void => { this.props.onYearClick(year); }}
            />
        );
    }
}
