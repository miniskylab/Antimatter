import {GregorianCalendar} from "@miniskylab/antimatter/date-time";
import React from "react";
import {MonthViewComponentProps} from "./models/month-view-component-props";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function MonthViewComponent(props: MonthViewComponentProps): JSX.Element
{
    function renderGridCell(month: Date): JSX.Element
    {
        const modifier = GregorianCalendar.isEqualMonth(month, props.selectedMonth)
            ? "--selected"
            : month.getFullYear() !== props.displayingYear
                ? "--extraneous"
                : String.EMPTY;

        return (
            <div
                key={`${month.getMonth()}${month.getFullYear()}`}
                onClick={(): void => { props.onMonthClicked(new Date(month)); }}
                className={props.variant[`month-view__grid-cell${modifier}`]}
            >
                {GregorianCalendar.getShortMonthName(month.getMonth())}
            </div>
        );
    }

    return (
        <div className={props.variant["month-view"]}>
            {((): JSX.Element[] =>
            {
                const monthGrid: JSX.Element[] = [];
                const month = new Date(props.displayingYear, 0, 1);
                for (let monthIndex = 0; monthIndex < GregorianCalendar.MONTH_COUNT_IN_YEAR; monthIndex++)
                {
                    month.setMonth(monthIndex);
                    monthGrid.push(renderGridCell(new Date(month)));
                }

                if (props.displayingYear < GregorianCalendar.MAX_YEAR)
                {
                    monthGrid.push(renderGridCell(new Date(props.displayingYear + 1, 0, 1)));
                    monthGrid.push(renderGridCell(new Date(props.displayingYear + 1, 1, 1)));
                    monthGrid.push(renderGridCell(new Date(props.displayingYear + 1, 2, 1)));
                    monthGrid.push(renderGridCell(new Date(props.displayingYear + 1, 3, 1)));
                }
                else
                {
                    monthGrid.unshift(renderGridCell(new Date(props.displayingYear - 1, 11, 1)));
                    monthGrid.unshift(renderGridCell(new Date(props.displayingYear - 1, 10, 1)));
                    monthGrid.unshift(renderGridCell(new Date(props.displayingYear - 1, 9, 1)));
                    monthGrid.unshift(renderGridCell(new Date(props.displayingYear - 1, 8, 1)));
                }

                return monthGrid;
            })()}
        </div>
    );
}
