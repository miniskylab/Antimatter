import {Decade, GregorianCalendar, whitespace} from "@miniskylab/antimatter-framework";
import React, {useMemo, useRef, useState} from "react";
import {Animated} from "react-native";
import {Control, DateView, Header, MonthView, YearView} from "./components";
import {Cache, CalendarContext, CalendarProps, CalendarState, TimeFrame, TransitionDirection, View, ViewType} from "./model";
import {canNavigateBackward, canNavigateForward, getDateViewData, getMonthViewData, getViewId, getYearViewData} from "./service";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Calendar({
    id,
    style,
    onReadyToUnmount,
    selectedDate,
    onSelectedDateChange
}: CalendarProps): JSX.Element
{
    const props: Required<CalendarProps> = {
        id, style, onReadyToUnmount, selectedDate, onSelectedDateChange
    };

    const [state, setState] = useState<CalendarState>(() =>
    {
        const today = new Date();
        const initialSelectedDate = new Date(selectedDate ?? today);
        initialSelectedDate.setDate(1);
        initialSelectedDate.setHours(0, 0, 0, 0);

        const timeFrame = {
            monthAndYear: initialSelectedDate,
            decade: GregorianCalendar.getDecade(initialSelectedDate.getFullYear())
        };

        return {
            today,
            activeView: {
                type: ViewType.Date,
                timeFrame
            },
            transitioningOutViews: [],
            transitionDirection: TransitionDirection.None
        };
    });

    const context = useMemo<CalendarContext>(
        () => ({props, state}),
        [...Object.values(props), ...Object.values(state)]
    );

    const cache = useRef<Cache>({
        dateViewData: new Map(),
        monthViewData: new Map(),
        yearViewData: new Map()
    });

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle, state);

    return (
        <CalendarContext.Provider value={context}>
            <Animated.View style={computedStyle.Root}>
                {renderHeader()}
                <Animated.View style={computedStyle.ViewContainer}>
                    {[
                        renderView(state.activeView),
                        ...state.transitioningOutViews.map(renderView)
                    ]}
                </Animated.View>
                {renderControl()}
            </Animated.View>
        </CalendarContext.Provider>
    );

    function getHeadline(): string
    {
        switch (state.activeView.type)
        {
            case ViewType.Date:
            {
                const date = state.activeView.timeFrame.monthAndYear;

                return `${GregorianCalendar.getFullMonthName(date.getMonth())}${whitespace(2)}${date.getFullYear()}`;
            }

            case ViewType.Month:
            {
                return `${state.activeView.timeFrame.monthAndYear.getFullYear()}`;
            }

            case ViewType.Year:
            {
                const decadeFirstYear = state.activeView.timeFrame.decade;
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
                    canNavigateBackward(state.activeView)
                        ? () => { navigate(TransitionDirection.Backward); }
                        : undefined
                }
                onHeadlineClick={
                    state.activeView.type < ViewType.Year
                        ? () => { zoomOut(); }
                        : undefined
                }
                onNextClick={
                    canNavigateForward(state.activeView)
                        ? () => { navigate(TransitionDirection.Forward); }
                        : undefined
                }
            />
        );
    }

    function renderView(view: View): JSX.Element
    {
        switch (view.type)
        {
            case ViewType.Date:
            {
                return (
                    <DateView.Component
                        key={getViewId(view)}
                        id={getViewId(view)}
                        style={computedStyle.DateView}
                        today={state.today}
                        data={getDateViewDataWithCache(view.timeFrame.monthAndYear)}
                        onDateClick={onDateClick}
                        onReadyToUnmount={onViewIsReadyToUnmount}
                    />
                );
            }

            case ViewType.Month:
            {
                return (
                    <MonthView.Component
                        key={getViewId(view)}
                        id={getViewId(view)}
                        style={computedStyle.MonthView}
                        data={getMonthViewDataWithCache(view.timeFrame.monthAndYear.getFullYear())}
                        onMonthClick={onMonthClick}
                        onReadyToUnmount={onViewIsReadyToUnmount}
                    />
                );
            }

            case ViewType.Year:
            {
                return (
                    <YearView.Component
                        key={getViewId(view)}
                        id={getViewId(view)}
                        style={computedStyle.YearView}
                        data={getYearViewDataWithCache(view.timeFrame.decade)}
                        onYearClick={onYearClick}
                        onReadyToUnmount={onViewIsReadyToUnmount}
                    />
                );
            }
        }
    }

    function renderControl(): JSX.Element
    {
        let dateViewData;
        if (state.activeView.type === ViewType.Date)
        {
            dateViewData = getDateViewData(state.activeView.timeFrame.monthAndYear).flat();
        }

        let todayIsVisible = state.activeView.type === ViewType.Date;
        if (todayIsVisible)
        {
            todayIsVisible = dateViewData.some(dateInfo => GregorianCalendar.isEqualDate(dateInfo.value, state.today));
        }

        let selectedDateIsVisible = selectedDate && state.activeView.type === ViewType.Date;
        if (selectedDateIsVisible)
        {
            selectedDateIsVisible = dateViewData.some(dateInfo => GregorianCalendar.isEqualDate(dateInfo.value, selectedDate));
        }

        return (
            <Control.Component
                style={computedStyle.Control}
                onTodayButtonClick={!todayIsVisible ? () => { goToToday(); } : null}
                onSelectionButtonClick={!selectedDateIsVisible ? () => { goToSelectedDate(); } : null}
            />
        );
    }

    function zoomIn(timeFrame: TimeFrame): void
    {
        if (state.activeView.type === ViewType.Date)
        {
            return;
        }

        setState(prevState =>
        {
            const nextViewType = prevState.activeView.type - 1;
            return {
                ...prevState,
                transitionDirection: TransitionDirection.Outward,
                view: {
                    type: nextViewType,
                    timeFrame
                }
            };
        });
    }

    function zoomOut(): void
    {
        if (state.activeView.type === ViewType.Year)
        {
            return;
        }

        setState(prevState =>
        {
            const nextViewType = prevState.activeView.type + 1;
            return {
                ...prevState,
                transitionDirection: TransitionDirection.Inward,
                view: {
                    ...prevState.activeView,
                    type: nextViewType
                }
            };
        });
    }

    function navigate(direction: TransitionDirection): void
    {
        const canNavigate = (
            (direction === TransitionDirection.Forward && canNavigateForward(state.activeView))
            ||
            (direction === TransitionDirection.Backward && canNavigateBackward(state.activeView))
        );

        if (!canNavigate)
        {
            return;
        }

        let decade: Decade;
        const monthAndYear = new Date(state.activeView.timeFrame.monthAndYear);

        switch (state.activeView.type)
        {
            case ViewType.Date:
            {
                const monthStep = direction === TransitionDirection.Forward ? 1 : -1;
                monthAndYear.setMonth(monthAndYear.getMonth() + monthStep);
                decade = GregorianCalendar.getDecade(monthAndYear.getFullYear());

                break;
            }

            case ViewType.Month:
            {
                const yearStep = direction === TransitionDirection.Forward ? 1 : -1;
                monthAndYear.setFullYear(monthAndYear.getFullYear() + yearStep);
                decade = GregorianCalendar.getDecade(monthAndYear.getFullYear());

                break;
            }

            case ViewType.Year:
            {
                const decadeStep = direction === TransitionDirection.Forward
                    ? GregorianCalendar.YEAR_COUNT_IN_DECADE
                    : -1 * GregorianCalendar.YEAR_COUNT_IN_DECADE;

                decade = (GregorianCalendar.getDecade(monthAndYear.getFullYear()) + decadeStep) as Decade;
                monthAndYear.setFullYear(decade, 0, 1);

                break;
            }
        }

        setState(prevState => ({
            ...prevState,
            transitionDirection: direction,
            activeView: {
                ...prevState.activeView,
                timeFrame: {monthAndYear, decade}
            },
            transitioningOutViews: [
                ...prevState.transitioningOutViews,
                {
                    type: prevState.activeView.type,
                    timeFrame: prevState.activeView.timeFrame
                }
            ]
        }));
    }

    function goToToday(): void
    {
        const thisMonth = new Date(state.today);
        thisMonth.setDate(1);
        thisMonth.setHours(0, 0, 0, 0);

        const todayTimeFrame = {
            monthAndYear: thisMonth,
            decade: GregorianCalendar.getDecade(thisMonth.getFullYear())
        };

        setState(prevState => ({
            ...prevState,
            transitionDirection: getTransitionDirection(thisMonth),
            view: {
                type: ViewType.Date,
                timeFrame: todayTimeFrame
            }
        }));
    }

    function goToSelectedDate(): void
    {
        if (!selectedDate)
        {
            return;
        }

        const selectedDateTimeFrame = {
            monthAndYear: selectedDate,
            decade: GregorianCalendar.getDecade(selectedDate.getFullYear())
        };

        setState(prevState => ({
            ...prevState,
            transitionDirection: getTransitionDirection(selectedDate),
            view: {
                type: ViewType.Date,
                timeFrame: selectedDateTimeFrame
            }
        }));
    }

    function getTransitionDirection(toDate: Date): TransitionDirection
    {
        return state.activeView.type > ViewType.Date
            ? TransitionDirection.Outward
            : toDate < state.activeView.timeFrame.monthAndYear
                ? TransitionDirection.Backward
                : TransitionDirection.Forward;
    }

    function getDateViewDataWithCache(month: Date): DateView.DateInfo[][]
    {
        const cacheKey = `${month.getMonth()}${month.getFullYear()}`;
        return cache.current.dateViewData.has(cacheKey)
            ? cache.current.dateViewData.get(cacheKey)
            : cache.current.dateViewData.set(cacheKey, getDateViewData(month)) && cache.current.dateViewData.get(cacheKey);
    }

    function getMonthViewDataWithCache(year: number): MonthView.MonthInfo[]
    {
        const cacheKey = `${year}`;
        return cache.current.monthViewData.has(cacheKey)
            ? cache.current.monthViewData.get(cacheKey)
            : cache.current.monthViewData.set(cacheKey, getMonthViewData(year)) && cache.current.monthViewData.get(cacheKey);
    }

    function getYearViewDataWithCache(decade: Decade): YearView.YearInfo[]
    {
        const cacheKey = `${decade}`;
        return cache.current.yearViewData.has(cacheKey)
            ? cache.current.yearViewData.get(cacheKey)
            : cache.current.yearViewData.set(cacheKey, getYearViewData(decade)) && cache.current.yearViewData.get(cacheKey);
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

    function onViewIsReadyToUnmount(viewId: string): void
    {
        setState(prevState => ({
            ...prevState,
            transitioningOutViews: prevState.transitioningOutViews.filter(x => getViewId(x) !== viewId)
        }));
    }
}
