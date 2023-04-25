import {Decade, GregorianCalendar, whitespace} from "@miniskylab/antimatter-framework";
import {Animation, CompositeTransitionSettings, SlideDirection, Transition, ZoomDirection} from "@miniskylab/antimatter-transition";
import React, {useMemo, useRef, useState} from "react";
import {Animated, LayoutChangeEvent} from "react-native";
import {Control, DateView, Header, MonthView, YearView} from "./component";
import {ViewType} from "./enum";
import {CalendarContext, CalendarProps, CalendarState} from "./model";
import {canNavigateBackward, canNavigateForward, getDateViewData, getMonthViewData, getViewId, getYearViewData} from "./service";
import {Cache, TimeFrame} from "./type";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Calendar({
    style = Variant.Default,
    selectedDate,
    onSelectedDateChange
}: CalendarProps): JSX.Element
{
    const props: Required<CalendarProps> = {
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

    const calendarWidthRef = useRef<number>();
    const cacheRef = useRef<Cache>({
        dateViewData: new Map(),
        monthViewData: new Map(),
        yearViewData: new Map()
    });

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle, state);

    return (
        <CalendarContext.Provider value={context}>
            <Animated.View style={computedStyle.Root} onLayout={onCalendarLayout}>
                {renderHeader()}
                <Transition style={computedStyle.ViewTransition} settings={state.transitionSettings}>
                    {renderView()}
                </Transition>
                {renderControl()}
            </Animated.View>
        </CalendarContext.Provider>
    );

    function getHeadline(): string
    {
        switch (state.view.type)
        {
            case ViewType.Date:
            {
                const date = state.view.timeFrame.monthAndYear;

                return `${GregorianCalendar.getFullMonthName(date.getMonth())}${whitespace(2)}${date.getFullYear()}`;
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
                onPrevClick={
                    canNavigateBackward(state.view)
                        ? () => { slide(SlideDirection.Left); }
                        : undefined
                }
                onHeadlineClick={
                    state.view.type < ViewType.Year
                        ? () => { zoomOut(); }
                        : undefined
                }
                onNextClick={
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
                        data={getDateViewDataWithCache(state.view.timeFrame.monthAndYear)}
                        onDateClick={onDateClick}
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
                        data={getMonthViewDataWithCache(state.view.timeFrame.monthAndYear.getFullYear())}
                        onMonthClick={onMonthClick}
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
                        data={getYearViewDataWithCache(state.view.timeFrame.decade)}
                        onYearClick={onYearClick}
                    />
                );
            }
        }
    }

    function renderControl(): JSX.Element
    {
        let dateViewData;
        if (state.view.type === ViewType.Date)
        {
            dateViewData = getDateViewData(state.view.timeFrame.monthAndYear).flat();
        }

        let canNavigateToToday = true;
        if (state.view.type === ViewType.Date)
        {
            canNavigateToToday = !dateViewData.some(dateInfo => GregorianCalendar.isEqualDate(dateInfo.value, state.today));
        }

        let canNavigateToSelectedDate = !!selectedDate;
        if (selectedDate && state.view.type === ViewType.Date)
        {
            canNavigateToSelectedDate = !dateViewData.some(dateInfo => GregorianCalendar.isEqualDate(dateInfo.value, selectedDate));
        }

        return (
            <Control.Component
                style={computedStyle.Control}
                onTodayButtonClick={canNavigateToToday ? () => { goToToday(); } : null}
                onSelectionButtonClick={canNavigateToSelectedDate ? () => { goToSelectedDate(); } : null}
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
            decade: undefined,
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

    function getDateViewDataWithCache(month: Date): DateView.DateInfo[][]
    {
        const cacheKey = `${month.getMonth()}${month.getFullYear()}`;
        return cacheRef.current.dateViewData.has(cacheKey)
            ? cacheRef.current.dateViewData.get(cacheKey)
            : cacheRef.current.dateViewData.set(cacheKey, getDateViewData(month)) && cacheRef.current.dateViewData.get(cacheKey);
    }

    function getMonthViewDataWithCache(year: number): MonthView.MonthInfo[]
    {
        const cacheKey = `${year}`;
        return cacheRef.current.monthViewData.has(cacheKey)
            ? cacheRef.current.monthViewData.get(cacheKey)
            : cacheRef.current.monthViewData.set(cacheKey, getMonthViewData(year)) && cacheRef.current.monthViewData.get(cacheKey);
    }

    function getYearViewDataWithCache(decade: Decade): YearView.YearInfo[]
    {
        const cacheKey = `${decade}`;
        return cacheRef.current.yearViewData.has(cacheKey)
            ? cacheRef.current.yearViewData.get(cacheKey)
            : cacheRef.current.yearViewData.set(cacheKey, getYearViewData(decade)) && cacheRef.current.yearViewData.get(cacheKey);
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

    function onCalendarLayout(layoutChangeEvent: LayoutChangeEvent): void
    {
        calendarWidthRef.current = layoutChangeEvent.nativeEvent.layout.width;
    }
}
