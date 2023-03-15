import {Button} from "@miniskylab/antimatter-button";
import {GregorianCalendar} from "@miniskylab/antimatter-framework";
import {Label} from "@miniskylab/antimatter-label";
import React from "react";
import {Animated} from "react-native";
import {getData} from "./helper";
import {Props} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    style,
    today,
    displayingMonth,
    onDateClick
}: Props): JSX.Element
{
    const Style = style({today, displayingMonth, onDateClick});
    return (
        <Animated.View style={Style.Root}>
            <Label style={Style.WeekNo} pointerEvents={"none"} selectable={false}>#</Label>
            {renderDaysOfWeek()}
            {renderDates()}
        </Animated.View>
    );

    function renderDaysOfWeek(): JSX.Element[]
    {
        return (
            ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(shortDayName => (
                <Label key={shortDayName} style={Style.DayOfWeek} pointerEvents={"none"} selectable={false}>{shortDayName}</Label>
            ))
        );
    }

    function renderDates(): JSX.Element[][]
    {
        let week: JSX.Element[];
        const dateView: JSX.Element[][] = [];
        const dateViewData = getData(displayingMonth);
        const weekCountInDateView = 6;
        for (let weekNo = 0; weekNo < weekCountInDateView; weekNo++)
        {
            /**
             * According to ISO Week Date system: "Each week's year is the Gregorian year in which the Thursday falls".
             * In week[] array, I have adjusted so that:
             *     0 = Monday
             *     1 = Tuesday
             *     2 = Wednesday
             *     3 = Thursday
             */
            const thursday = 3;
            week = [
                <Label key={"#"} style={Style.WeekOfYear} selectable={false}>
                    {GregorianCalendar.getWeekNumber(dateViewData[weekNo][thursday]).toString()}
                </Label>
            ];

            for (let dayNo = 0; dayNo < GregorianCalendar.DAY_COUNT_IN_WEEK; dayNo++)
            {
                const date = dateViewData[weekNo][dayNo];
                const isToday = GregorianCalendar.isEqualDate(date, today);
                const dateContainerStyle = Style.DateContainer(date);

                week.push(
                    <Button
                        key={dayNo.toString()}
                        style={dateContainerStyle.Container}
                        onClick={() => { onDateClick?.(date); }}
                    >
                        {isToday && <Label style={dateContainerStyle.TodayText} selectable={false}>Today</Label>}
                        <Label style={dateContainerStyle.DateNumber} selectable={false}>{date.getDate().toString()}</Label>
                    </Button>
                );
            }

            dateView.push(week);
        }

        return dateView;
    }
}
