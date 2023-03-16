import {Decade, GregorianCalendar, whitespace} from "@miniskylab/antimatter-framework";
import React, {useState} from "react";
import {Animated} from "react-native";
import {Control, DateView, Header, MonthView, YearView} from "./components";
import {canNavigateBackward, canNavigateForward} from "./helper";
import {CalendarProps, TimeFrame, TransitionDirection, View} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Calendar({
    style,
    selectedDate,
    highlightedDates = [],
    onSelectedDateChange
}: CalendarProps): JSX.Element
{
    const today = new Date();
    const [view, setView] = useState(View.Date);
    const [transitionDirection, setTransitionDirection] = useState(TransitionDirection.None);
    const [timeFrame, setTimeFrame] = useState<TimeFrame>(() =>
    {
        const initialSelectedDate = new Date(selectedDate ?? today);
        initialSelectedDate.setDate(1);
        initialSelectedDate.setHours(0, 0, 0, 0);

        return {
            monthAndYear: initialSelectedDate,
            decade: GregorianCalendar.getDecade(initialSelectedDate.getFullYear())
        };
    });

    const Style = style(
        {selectedDate, highlightedDates, onSelectedDateChange},
        {view, today, timeFrame, transitionDirection}
    );

    return (
        <Animated.View style={Style.Root}>
            {renderHeader()}
            {renderView()}
            {renderControl()}
        </Animated.View>
    );

    function getHeadline(): string
    {
        switch (view)
        {
            case View.Date:
            {
                const date = timeFrame.monthAndYear;

                return `${GregorianCalendar.getFullMonthName(date.getMonth())}${whitespace(2)}${date.getFullYear()}`;
            }

            case View.Month:
            {
                return `${timeFrame.monthAndYear.getFullYear()}`;
            }

            case View.Year:
            {
                const decadeFirstYear = timeFrame.decade;
                const decadeLastYear = decadeFirstYear + GregorianCalendar.YEAR_COUNT_IN_DECADE - 1;

                return `${decadeFirstYear} - ${decadeLastYear}`;
            }
        }
    }

    function renderHeader(): JSX.Element
    {
        return (
            <Header.Component
                style={Style.Header}
                headline={getHeadline()}
                onPrevClick={
                    canNavigateBackward(view, timeFrame)
                        ? () => { navigate(TransitionDirection.Backward); }
                        : undefined
                }
                onHeadlineClick={
                    view < View.Year
                        ? () => { zoomOut(); }
                        : undefined
                }
                onNextClick={
                    canNavigateForward(view, timeFrame)
                        ? () => { navigate(TransitionDirection.Forward); }
                        : undefined
                }
            />
        );
    }

    function renderView(): JSX.Element
    {
        return (
            view === View.Date &&
            (
                <DateView.Component
                    style={Style.DateView}
                    today={today}
                    displayingMonth={timeFrame.monthAndYear}
                    onDateClick={onDateClick}
                />
            ) || view === View.Month &&
            (
                <MonthView.Component
                    style={Style.MonthView}
                    displayingYear={timeFrame.monthAndYear.getFullYear()}
                    onMonthClick={onMonthClick}
                />
            ) || view === View.Year &&
            (
                <YearView.Component
                    style={Style.YearView}
                    displayingDecade={timeFrame.decade}
                    onYearClick={onYearClick}
                />
            )
        );
    }

    function renderControl(): JSX.Element
    {
        return (
            <Control.Component
                style={Style.Control}
                onTodayButtonClick={
                    view !== View.Date || !isWithinTimeFrame(today)
                        ? () => { goToToday(); }
                        : null
                }
                onSelectionButtonClick={
                    selectedDate && (view !== View.Date || !isWithinTimeFrame(selectedDate))
                        ? () => { goToSelectedDate(); }
                        : null
                }
            />
        );
    }

    function zoomIn(timeFrame: TimeFrame): void
    {
        if (view === View.Date)
        {
            return;
        }

        setTransitionDirection(TransitionDirection.Outward);
        setView(view - 1);
        setTimeFrame(timeFrame);
    }

    function zoomOut(): void
    {
        if (view === View.Year)
        {
            return;
        }

        setTransitionDirection(TransitionDirection.Inward);
        setView(view + 1);
    }

    function navigate(direction: TransitionDirection): void
    {
        const canNavigate = (
            (direction === TransitionDirection.Forward && canNavigateForward(view, timeFrame))
            ||
            (direction === TransitionDirection.Backward && canNavigateBackward(view, timeFrame))
        );

        if (!canNavigate)
        {
            return;
        }

        let decade: Decade;
        const monthAndYear = new Date(timeFrame.monthAndYear);

        switch (view)
        {
            case View.Date:
            {
                const monthStep = direction === TransitionDirection.Forward ? 1 : -1;
                monthAndYear.setMonth(monthAndYear.getMonth() + monthStep);
                decade = GregorianCalendar.getDecade(monthAndYear.getFullYear());

                break;
            }

            case View.Month:
            {
                const yearStep = direction === TransitionDirection.Forward ? 1 : -1;
                monthAndYear.setFullYear(monthAndYear.getFullYear() + yearStep);
                decade = GregorianCalendar.getDecade(monthAndYear.getFullYear());

                break;
            }

            case View.Year:
            {
                const decadeStep = direction === TransitionDirection.Forward
                    ? GregorianCalendar.YEAR_COUNT_IN_DECADE
                    : -1 * GregorianCalendar.YEAR_COUNT_IN_DECADE;

                decade = (GregorianCalendar.getDecade(monthAndYear.getFullYear()) + decadeStep) as Decade;
                monthAndYear.setFullYear(decade, 0, 1);

                break;
            }
        }

        setTransitionDirection(direction);
        setTimeFrame({monthAndYear, decade});
    }

    function goToToday(): void
    {
        const thisMonth = new Date(today);
        thisMonth.setDate(1);
        thisMonth.setHours(0, 0, 0, 0);

        setView(View.Date);
        setTransitionDirection(getTransitionDirection(thisMonth));
        setTimeFrame({
            monthAndYear: thisMonth,
            decade: GregorianCalendar.getDecade(thisMonth.getFullYear())
        });
    }

    function goToSelectedDate(): void
    {
        if (!selectedDate)
        {
            return;
        }

        setView(View.Date);
        setTransitionDirection(getTransitionDirection(selectedDate));
        setTimeFrame({
            monthAndYear: selectedDate,
            decade: GregorianCalendar.getDecade(selectedDate.getFullYear())
        });
    }

    function getTransitionDirection(toDate: Date): TransitionDirection
    {
        return view > View.Date
            ? TransitionDirection.Outward
            : toDate < timeFrame.monthAndYear
                ? TransitionDirection.Backward
                : TransitionDirection.Forward;
    }

    function isWithinTimeFrame(date: Date): boolean
    {
        const dateViewData = DateView.getData(timeFrame.monthAndYear);
        return dateViewData.flat().filter(x => GregorianCalendar.isEqualDate(x, date))?.length > 0;
    }

    function onDateClick(date: Date): void
    {
        onSelectedDateChange?.(GregorianCalendar.isEqualDate(date, selectedDate) ? undefined : date);
    }

    function onMonthClick(month: Date): void
    {
        zoomIn({
            monthAndYear: month,
            decade: GregorianCalendar.getDecade(month.getFullYear())
        });
    }

    function onYearClick(year: number): void
    {
        zoomIn({
            monthAndYear: new Date(year, 0, 1),
            decade: GregorianCalendar.getDecade(year)
        });
    }
}
