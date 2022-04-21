import {Decade, GregorianCalendar} from "@miniskylab/antimatter-typescript";
import React from "react";
import * as Variant from "../month-view/variants";
import {Props} from "./models/props";

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
            <div className={this.props.variant["year-view"]}>
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
            <div
                key={year}
                onClick={outOfSupportedYearRange ? undefined : (): void => { this.props.onYearClick(year); }}
                className={this.props.variant[`year-view__grid-cell${modifier}`]}
            >
                {outOfSupportedYearRange ? String.EMPTY : year}
            </div>
        );
    }
}
