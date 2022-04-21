import {GregorianCalendar, LunarCalendarVn} from "@miniskylab/antimatter-typescript";
import React from "react";
import {getDateViewData} from "./helpers/date-view-data";
import {HighlightedDate} from "./models/highlighted-date";
import {Props} from "./models/props";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class Component extends React.Component<Props>
{
    static defaultProps: Partial<Props> = {
        variant: Variant.Default,
        highlightedDates: []
    };

    private today: Date;

    render(): JSX.Element
    {
        this.today = new Date();

        return (
            <div className={this.props.variant["date-view"]}>
                <div className={this.props.variant["date-view__week-no"]}>#</div>
                {this.renderDaysOfWeek()}
                {this.renderDates()}
            </div>
        );
    }

    private renderDaysOfWeek(): JSX.Element[]
    {
        return (
            ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(shortDayName => (
                <div key={shortDayName} className={this.props.variant["date-view__day-of-week"]}>
                    {shortDayName}
                </div>
            ))
        );
    }

    private renderDates(): JSX.Element[][]
    {
        let week: JSX.Element[];
        const dateView: JSX.Element[][] = [];
        const dateViewData = getDateViewData(this.props.displayingMonth);
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
                <div key={"#"} className={this.props.variant["date-view__week-of-year"]}>
                    {GregorianCalendar.getWeekNumber(dateViewData[weekNo][thursday])}
                </div>
            ];

            for (let dayNo = 0; dayNo < GregorianCalendar.DAY_COUNT_IN_WEEK; dayNo++)
            {
                const date = dateViewData[weekNo][dayNo];
                const isToday = GregorianCalendar.isEqualDate(date, this.today);

                week.push(
                    <div
                        key={dayNo.toString()}
                        className={this.getDateClassName(date)}
                        onClick={() => { this.props.onDateClick?.(date); }}
                    >
                        {
                            isToday
                                ? <div className={this.props.variant["date-view__today"]}>
                                    <div className={this.props.variant["date-view__today-text"]}>Today</div>
                                    <div className={this.props.variant["date-view__today-number"]}>
                                        {date.getDate()}
                                    </div>
                                </div>
                                : <div className={this.props.variant["date-view__date"]}>{date.getDate()}</div>
                        }
                    </div>
                );
            }

            dateView.push(week);
        }

        return dateView;
    }

    private getDateClassName(date: Date): string
    {
        if (GregorianCalendar.isEqualDate(date, this.today))
        {
            const className = "date-view__today-container";
            if (GregorianCalendar.isEqualDate(date, this.props.selectedDate))
            {
                return this.props.variant[`${className}--selected`];
            }

            if (this.isHighlightedDate(date))
            {
                return this.props.variant[`${className}--highlighted`];
            }

            return this.props.variant[className];
        }

        const className = "date-view__date-container";
        if (GregorianCalendar.isEqualDate(date, this.props.selectedDate))
        {
            return this.props.variant[`${className}--selected`];
        }

        if (this.isHighlightedDate(date))
        {
            return this.props.variant[`${className}--highlighted`];
        }

        if (!GregorianCalendar.isEqualMonth(date, this.props.displayingMonth))
        {
            return this.props.variant[`${className}--extraneous`];
        }

        return this.props.variant[className];
    }

    private isHighlightedDate(date: Date): boolean { return !!this.getHighlightedDate(date); }

    private getHighlightedDate(date: Date): HighlightedDate
    {
        for (const highlightedDate of this.props.highlightedDates)
        {
            let _date = highlightedDate.day;
            let month = highlightedDate.month;
            let year = highlightedDate.year;
            if (highlightedDate.useLunarCalendar)
            {
                const lunarYear = LunarCalendarVn.getLunarDate(date)[0];
                const gregorianDate = LunarCalendarVn.getGregorianDate(year || lunarYear, month + 1, _date);
                if (!gregorianDate)
                {
                    return null;
                }

                _date = gregorianDate.getDate();
                month = gregorianDate.getMonth();
                year = year && gregorianDate.getFullYear();
            }

            const matchDate = _date === date.getDate();
            const matchMonth = month !== undefined && month !== null ? month === date.getMonth() : true;
            const matchYear = year ? year === date.getFullYear() : true;
            if (matchDate && matchMonth && matchYear)
            {
                return highlightedDate;
            }
        }

        return null;
    }
}
