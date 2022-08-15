import {Label} from "@miniskylab/antimatter-label";
import {GregorianCalendar, LunarCalendarVn} from "@miniskylab/antimatter-typescript";
import React from "react";
import {getData} from "./helper";
import {HighlightedDate, Props} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class Component extends React.Component<Props>
{
    static defaultProps: Partial<Props> = {
        className: "date-view",
        highlightedDates: []
    };

    private today: Date;

    render(): JSX.Element
    {
        this.today = new Date();

        return (
            <div className={this.props.className}>
                <Label className={`${this.props.className}__week-no`} text={"#"}/>
                {this.renderDaysOfWeek()}
                {this.renderDates()}
            </div>
        );
    }

    private renderDaysOfWeek(): JSX.Element[]
    {
        return (
            ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(shortDayName => (
                <Label key={shortDayName} className={`${this.props.className}__day-of-week`} text={shortDayName}/>
            ))
        );
    }

    private renderDates(): JSX.Element[][]
    {
        let week: JSX.Element[];
        const dateView: JSX.Element[][] = [];
        const dateViewData = getData(this.props.displayingMonth);
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
                <Label
                    key={"#"}
                    className={`${this.props.className}__week-of-year`}
                    text={GregorianCalendar.getWeekNumber(dateViewData[weekNo][thursday]).toString()}
                />
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
                                ? <div className={`${this.props.className}__today`}>
                                    <Label className={`${this.props.className}__today-text`} text={"Today"}/>
                                    <Label className={`${this.props.className}__today-number`} text={date.getDate().toString()}/>
                                </div>
                                : <Label className={`${this.props.className}__date`} text={date.getDate().toString()}/>
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
            const dateClassName = `${this.props.className}__today-container`;
            if (GregorianCalendar.isEqualDate(date, this.props.selectedDate))
            {
                return `${dateClassName}--selected`;
            }

            if (this.isHighlightedDate(date))
            {
                return `${dateClassName}--highlighted`;
            }

            return dateClassName;
        }

        const dateClassName = `${this.props.className}__date-container`;
        if (GregorianCalendar.isEqualDate(date, this.props.selectedDate))
        {
            return `${dateClassName}--selected`;
        }

        if (this.isHighlightedDate(date))
        {
            return `${dateClassName}--highlighted`;
        }

        if (!GregorianCalendar.isEqualMonth(date, this.props.displayingMonth))
        {
            return `${dateClassName}--extraneous`;
        }

        return dateClassName;
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
