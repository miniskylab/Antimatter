import {Button} from "@miniskylab/antimatter-button";
import {GregorianCalendar} from "@miniskylab/antimatter-framework";
import React from "react";
import {Animated} from "react-native";
import {Props} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    style,
    selectedMonth,
    displayingYear,
    onMonthClick
}: Props): JSX.Element
{
    const Style = style({selectedMonth, displayingYear, onMonthClick});
    return (
        <Animated.View style={Style.Root}>
            {renderGrid()}
        </Animated.View>
    );

    function renderGrid(): JSX.Element[]
    {
        const monthGrid: JSX.Element[] = [];
        const month = new Date(displayingYear, 0, 1);
        for (let monthIndex = 0; monthIndex < GregorianCalendar.MONTH_COUNT_IN_YEAR; monthIndex++)
        {
            month.setMonth(monthIndex);
            monthGrid.push(renderGridCell(new Date(month)));
        }

        if (displayingYear < GregorianCalendar.MAX_YEAR)
        {
            monthGrid.push(renderGridCell(new Date(displayingYear + 1, 0, 1)));
            monthGrid.push(renderGridCell(new Date(displayingYear + 1, 1, 1)));
            monthGrid.push(renderGridCell(new Date(displayingYear + 1, 2, 1)));
            monthGrid.push(renderGridCell(new Date(displayingYear + 1, 3, 1)));
        }
        else
        {
            monthGrid.unshift(renderGridCell(new Date(displayingYear - 1, 11, 1)));
            monthGrid.unshift(renderGridCell(new Date(displayingYear - 1, 10, 1)));
            monthGrid.unshift(renderGridCell(new Date(displayingYear - 1, 9, 1)));
            monthGrid.unshift(renderGridCell(new Date(displayingYear - 1, 8, 1)));
        }

        return monthGrid;
    }

    function renderGridCell(month: Date): JSX.Element
    {
        return (
            <Button
                key={`${month.getMonth()}${month.getFullYear()}`}
                style={Style.GridCell(month)}
                label={GregorianCalendar.getShortMonthName(month.getMonth())}
                onClick={() => { onMonthClick(new Date(month)); }}
            />
        );
    }
}
