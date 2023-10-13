import {GregorianCalendar, Style, Ts} from "@miniskylab/antimatter-framework";
import {Label} from "@miniskylab/antimatter-label";
import {Pressable} from "@miniskylab/antimatter-pressable";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {DateContext, DateViewContext, Props} from "./models";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    style,
    today,
    data,
    onDatePress
}: Props): JSX.Element
{
    const props: Required<Props> = {
        style, today, data, onDatePress
    };

    const context = useMemo<DateViewContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const computedStyle = Style.useComputedStyle(style, props);

    return (
        <DateViewContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <Label style={computedStyle.WeekNo} pointerEvents={"none"} selectable={false}>#</Label>
                {renderDaysOfWeek()}
                {renderDates()}
            </View>
        </DateViewContext.Provider>
    );

    function renderDaysOfWeek(): JSX.Element[]
    {
        return (
            ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(shortDayName => (
                <Label key={shortDayName} style={computedStyle.DayOfWeek} pointerEvents={"none"} selectable={false}>{shortDayName}</Label>
            ))
        );
    }

    function renderDates(): JSX.Element[][]
    {
        let week: JSX.Element[];
        const weekCountInDateView = 6;
        const dateView: JSX.Element[][] = [];
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
                <Label key={"#"} style={computedStyle.WeekOfYear} selectable={false}>
                    {GregorianCalendar.getWeekNumber(data[weekNo][thursday].value).toString()}
                </Label>
            ];

            for (let dayNo = 0; dayNo < GregorianCalendar.DAY_COUNT_IN_WEEK; dayNo++)
            {
                const dateInfo = useMemo(
                    () => data[weekNo][dayNo],
                    [
                        data[weekNo][dayNo].value.getTime(),
                        data[weekNo][dayNo].isExtraneous
                    ]
                );
                const isToday = Ts.Date.isEqualDate(dateInfo.value, today);

                week.push(
                    <DateContext.Provider key={data[weekNo][dayNo].value.getTime()} value={dateInfo}>
                        <Pressable style={computedStyle.DateContainer} onPress={() => { onDatePress?.(dateInfo.value); }}>
                            {isToday && <Label style={computedStyle.TodayText} selectable={false}>Today</Label>}
                            <Label style={computedStyle.DateNumber} selectable={false}>{dateInfo.value.getDate().toString()}</Label>
                        </Pressable>
                    </DateContext.Provider>
                );
            }

            dateView.push(week);
        }

        return dateView;
    }
}
