import {AllPropertiesMustPresent, Decade, GregorianCalendar, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Animation, CompositeTransitionSettings, SlideDirection, Transition, ZoomDirection} from "@miniskylab/antimatter-transition";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo, useRef, useState} from "react";
import {LayoutChangeEvent} from "react-native";
import {Control, DateView, Header, MonthView, YearView} from "./components";
import {ViewType} from "./enums";
import {CalendarContext, CalendarProps, CalendarState} from "./models";
import {canNavigateBackward, canNavigateForward, getDateViewData, getMonthViewData, getViewId, getYearViewData} from "./services";
import type {TimeFrame} from "./types";
import * as Variant from "./variants";

/**
 * A component that renders a series of pages showing the days, weeks, months and years and allows users to select a date.
 */
export function Calendar({
    style = Variant.Default,
    selectedDate,
    onSelectedDateChange
}: CalendarProps): JSX.Element
{
    const props: AllPropertiesMustPresent<CalendarProps> = {
        style, selectedDate, onSelectedDateChange
    };

    const [state, setState] = useState<CalendarState>(() =>
    {
        const today = new Date();
        const initialSelectedDate = new Date(selectedDate ?? today);
        initialSelectedDate.setDate(1);
        initialSelectedDate.setHours(0, 0, 0, 0);

        return {
            today,
            view: {
                type: ViewType.Date,
                timeFrame: {
                    monthAndYear: initialSelectedDate,
                    decade: GregorianCalendar.getDecade(initialSelectedDate.getFullYear())
                }
            },
            transitionSettings: {
                animation: Animation.None
            }
        };
    });

    const context = useMemo<CalendarContext>(
        () => ({props, state}),
        [...Object.values(props), ...Object.values(state)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props, state);

    const calendarWidthRef = useRef<number>(NaN);
    const dateViewData = useMemo<DateView.DateInfo[][]>(
        () => getDateViewData(state.view.timeFrame.monthAndYear),
        [`${state.view.timeFrame.monthAndYear.getMonth()}${state.view.timeFrame.monthAndYear.getFullYear()}`]
    );
    const monthViewData = useMemo<MonthView.MonthInfo[]>(
        () => getMonthViewData(state.view.timeFrame.monthAndYear.getFullYear()),
        [state.view.timeFrame.monthAndYear.getFullYear()]
    );
    const yearViewData = useMemo<YearView.YearInfo[]>(
        () => getYearViewData(state.view.timeFrame.decade),
        [state.view.timeFrame.decade]
    );

    return (
        <CalendarContext.Provider value={context}>
            <View style={computedStyle.Root} onLayout={onCalendarLayout}>
                {renderHeader()}
                <Transition style={computedStyle.ViewTransition} settings={state.transitionSettings}>
                    {renderView()}
                </Transition>
                {renderControl()}
            </View>
        </CalendarContext.Provider>
    );

    function getHeadline(): string
    {
        switch (state.view.type)
        {
            case ViewType.Date:
            {
                const date = state.view.timeFrame.monthAndYear;

                return `${GregorianCalendar.getFullMonthName(date.getMonth())}${Ts.String.whitespace(2)}${date.getFullYear()}`;
            }

            case ViewType.Month:
            {
                return `${state.view.timeFrame.monthAndYear.getFullYear()}`;
            }

            case ViewType.Year:
            {
                const decadeFirstYear = state.view.timeFrame.decade;
                const decadeLastYear = decadeFirstYear + GregorianCalendar.YEAR_COUNT_IN_DECADE - 1;

                return `${decadeFirstYear} - ${decadeLastYear}`;
            }
        }
    }

    function renderHeader(): JSX.Element
    {
        return (
            <Header.Component
                style={computedStyle.Header}
                headline={getHeadline()}
                onPrevPress={
                    canNavigateBackward(state.view)
                        ? () => { slide(SlideDirection.Left); }
                        : undefined
                }
                onHeadlinePress={
                    state.view.type < ViewType.Year
                        ? () => { zoomOut(); }
                        : undefined
                }
                onNextPress={
                    canNavigateForward(state.view)
                        ? () => { slide(SlideDirection.Right); }
                        : undefined
                }
            />
        );
    }

    function renderView(): JSX.Element
    {
        switch (state.view.type)
        {
            case ViewType.Date:
            {
                return (
                    <DateView.Component
                        key={getViewId(state.view)}
                        style={computedStyle.DateView}
                        today={state.today}
                        data={dateViewData}
                        onDatePress={onDatePress}
                    />
                );
            }

            case ViewType.Month:
            {
                return (
                    <MonthView.Component
                        key={getViewId(state.view)}
                        style={computedStyle.MonthView}
                        selectedMonth={state.today}
                        data={monthViewData}
                        onMonthPress={onMonthPress}
                    />
                );
            }

            case ViewType.Year:
            {
                return (
                    <YearView.Component
                        key={getViewId(state.view)}
                        style={computedStyle.YearView}
                        selectedYear={state.today.getFullYear()}
                        data={yearViewData}
                        onYearPress={onYearPress}
                    />
                );
            }
        }
    }

    function renderControl(): JSX.Element
    {
        let flattenedDateViewData;
        if (state.view.type === ViewType.Date)
        {
            flattenedDateViewData = dateViewData.flat();
        }

        let canNavigateToToday = true;
        if (state.view.type === ViewType.Date)
        {
            canNavigateToToday = !flattenedDateViewData?.some(dateInfo => Ts.Date.isEqualDate(dateInfo.value, state.today));
        }

        let canNavigateToSelectedDate = !!selectedDate;
        if (selectedDate && state.view.type === ViewType.Date)
        {
            canNavigateToSelectedDate = !flattenedDateViewData?.some(dateInfo => Ts.Date.isEqualDate(dateInfo.value, selectedDate));
        }

        return (
            <Control.Component
                style={computedStyle.Control}
                onTodayButtonPress={canNavigateToToday ? goToToday : undefined}
                onSelectionButtonPress={canNavigateToSelectedDate ? goToSelectedDate : undefined}
            />
        );
    }

    function zoomIn(timeFrame: TimeFrame): void
    {
        if (state.view.type === ViewType.Date)
        {
            return;
        }

        setState(prevState => ({
            ...prevState,
            view: {
                ...prevState.view,
                type: prevState.view.type - 1,
                timeFrame
            },
            transitionSettings: {
                animation: Animation.Zoom,
                zoomDirection: ZoomDirection.Inward
            }
        }));
    }

    function zoomOut(): void
    {
        if (state.view.type === ViewType.Year)
        {
            return;
        }

        setState(prevState => ({
            ...prevState,
            view: {
                ...prevState.view,
                type: prevState.view.type + 1
            },
            transitionSettings: {
                animation: Animation.Zoom,
                zoomDirection: ZoomDirection.Outward
            }
        }));
    }

    function slide(slideDirection: SlideDirection): void
    {
        const canSlide = (
            (slideDirection === SlideDirection.Right && canNavigateForward(state.view))
            ||
            (slideDirection === SlideDirection.Left && canNavigateBackward(state.view))
        );

        if (!canSlide)
        {
            return;
        }

        setState(prevState => ({
            ...prevState,
            view: {
                ...prevState.view,
                timeFrame: getNextTimeFrame(slideDirection)
            },
            transitionSettings: {
                animation: Animation.Slide,
                pxSlideDistance: calendarWidthRef.current,
                slideDirection
            }
        }));
    }

    function goToToday(): void
    {
        const thisMonth = new Date(state.today);
        thisMonth.setDate(1);
        thisMonth.setHours(0, 0, 0, 0);

        setState(prevState => ({
            ...prevState,
            view: {
                ...prevState.view,
                type: ViewType.Date,
                timeFrame: {
                    monthAndYear: thisMonth,
                    decade: GregorianCalendar.getDecade(thisMonth.getFullYear())
                }
            },
            transitionSettings: getTransitionSettings(thisMonth)
        }));
    }

    function goToSelectedDate(): void
    {
        if (!selectedDate)
        {
            return;
        }

        setState(prevState => ({
            ...prevState,
            view: {
                ...prevState.view,
                type: ViewType.Date,
                timeFrame: {
                    monthAndYear: selectedDate,
                    decade: GregorianCalendar.getDecade(selectedDate.getFullYear())
                }
            },
            transitionSettings: getTransitionSettings(selectedDate)
        }));
    }

    function getNextTimeFrame(slideDirection: SlideDirection): TimeFrame
    {
        const nextTimeFrame: TimeFrame = {
            decade: state.view.timeFrame.decade,
            monthAndYear: new Date(state.view.timeFrame.monthAndYear)
        };

        switch (state.view.type)
        {
            case ViewType.Date:
            {
                const monthStep = slideDirection === SlideDirection.Right ? 1 : -1;
                nextTimeFrame.monthAndYear.setMonth(nextTimeFrame.monthAndYear.getMonth() + monthStep);
                nextTimeFrame.decade = GregorianCalendar.getDecade(nextTimeFrame.monthAndYear.getFullYear());

                break;
            }

            case ViewType.Month:
            {
                const yearStep = slideDirection === SlideDirection.Right ? 1 : -1;
                nextTimeFrame.monthAndYear.setFullYear(nextTimeFrame.monthAndYear.getFullYear() + yearStep);
                nextTimeFrame.decade = GregorianCalendar.getDecade(nextTimeFrame.monthAndYear.getFullYear());

                break;
            }

            case ViewType.Year:
            {
                const decadeStep = slideDirection === SlideDirection.Right
                    ? GregorianCalendar.YEAR_COUNT_IN_DECADE
                    : -1 * GregorianCalendar.YEAR_COUNT_IN_DECADE;

                nextTimeFrame.decade = (GregorianCalendar.getDecade(nextTimeFrame.monthAndYear.getFullYear()) + decadeStep) as Decade;
                nextTimeFrame.monthAndYear.setFullYear(nextTimeFrame.decade, 0, 1);

                break;
            }
        }

        return nextTimeFrame;
    }

    function getTransitionSettings(toDate: Date): CompositeTransitionSettings
    {
        return state.view.type > ViewType.Date
            ? {
                animation: Animation.Zoom,
                zoomDirection: ZoomDirection.Inward
            }
            : {
                animation: Animation.Slide,
                pxSlideDistance: calendarWidthRef.current,
                slideDirection: toDate < state.view.timeFrame.monthAndYear
                    ? SlideDirection.Left
                    : SlideDirection.Right
            };
    }

    function onDatePress(pressedDate: Date): void
    {
        onSelectedDateChange?.(Ts.Date.isEqualDate(selectedDate, pressedDate) ? undefined : pressedDate);
    }

    function onMonthPress(month: Date): void
    {
        zoomIn({
            monthAndYear: month,
            decade: GregorianCalendar.getDecade(month.getFullYear())
        });
    }

    function onYearPress(year: number): void
    {
        zoomIn({
            monthAndYear: new Date(year, 0, 1),
            decade: GregorianCalendar.getDecade(year)
        });
    }

    function onCalendarLayout(layoutChangeEvent: LayoutChangeEvent): void
    {
        calendarWidthRef.current = layoutChangeEvent.nativeEvent.layout.width;
    }
}
