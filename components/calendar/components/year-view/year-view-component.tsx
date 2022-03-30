import {Decade, GregorianCalendar} from "@miniskylab/antimatter-typescript";
import React from "react";
import {YearViewComponentProps} from "./models/year-view-component-props";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function YearViewComponent(props: YearViewComponentProps): JSX.Element
{
    function renderGridCell(year: number, nextDecade: Decade): JSX.Element
    {
        const outOfSupportedYearRange = year < GregorianCalendar.MIN_YEAR || GregorianCalendar.MAX_YEAR < year;
        const modifier = outOfSupportedYearRange
            ? "--empty"
            : year === props.selectedYear
                ? "--selected"
                : year < props.displayingDecade || nextDecade <= year
                    ? "--extraneous"
                    : String.EMPTY;

        return (
            <div
                key={year}
                onClick={
                    outOfSupportedYearRange
                        ? undefined
                        : (): void => { props.onYearClick(year); }
                }
                className={props.variant[`year-view__grid-cell${modifier}`]}
            >
                {
                    outOfSupportedYearRange
                        ? String.EMPTY
                        : year
                }
            </div>
        );
    }

    return (
        <div className={props.variant["year-view"]}>
            {((): JSX.Element[] =>
            {
                const yearGrid: JSX.Element[] = [];
                const nextDecade = (props.displayingDecade + GregorianCalendar.YEAR_COUNT_IN_DECADE) as Decade;
                for (let year = props.displayingDecade; year < nextDecade; year++)
                {
                    yearGrid.push(renderGridCell(year, nextDecade));
                }

                yearGrid.unshift(renderGridCell(props.displayingDecade - 1, nextDecade));
                yearGrid.unshift(renderGridCell(props.displayingDecade - 2, nextDecade));
                yearGrid.unshift(renderGridCell(props.displayingDecade - 3, nextDecade));

                yearGrid.push(renderGridCell(nextDecade, nextDecade));
                yearGrid.push(renderGridCell(nextDecade + 1, nextDecade));
                yearGrid.push(renderGridCell(nextDecade + 2, nextDecade));

                return yearGrid;
            })()}
        </div>
    );
}
