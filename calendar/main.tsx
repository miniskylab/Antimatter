import {Decade, GregorianCalendar, whitespace} from "@miniskylab/antimatter-framework";
import React, {useMemo, useRef, useState} from "react";
import {Animated} from "react-native";
import {Control, DateView, Header, MonthView, YearView} from "./component";
import {TransitionDirection, ViewType} from "./enum";
import {CalendarContext, CalendarProps, CalendarState} from "./model";
import {canNavigateBackward, canNavigateForward, getDateViewData, getMonthViewData, getViewId, getYearViewData} from "./service";
import {Cache, TimeFrame, View} from "./type";

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

        return {
            today,
            activeView: {
                type: ViewType.Date,
                timeFrame: {
                    monthAndYear: initialSelectedDate,
                    decade: GregorianCalendar.getDecade(initialSelectedDate.getFullYear())
                }
            },
            transitioningOutViews: {},
            transitionDirection: TransitionDirection.None
        };
    });

    const context = useMemo<CalendarContext>(
        () => ({props, state}),
        [...Object.values(props), ...Object.values(state)]
    );

    const cacheRef = useRef<Cache>({
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
                        ...Object.values(state.transitioningOutViews).map(renderView)
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

        let canNavigateToToday = false;
        if (state.activeView.type === ViewType.Date)
        {
            canNavigateToToday = !dateViewData.some(dateInfo => GregorianCalendar.isEqualDate(dateInfo.value, state.today));
        }

        let canNavigateToSelectedDate = false;
        if (selectedDate && state.activeView.type === ViewType.Date)
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
        if (state.activeView.type === ViewType.Date)
        {
            return;
        }

        setState(prevState =>
        {
            const activeView = {...prevState.activeView, type: prevState.activeView.type - 1, timeFrame};
            const transitioningOutViews = {...prevState.transitioningOutViews, [getViewId(prevState.activeView)]: prevState.activeView};
            delete transitioningOutViews[getViewId(activeView)];

            return {
                ...prevState,
                activeView,
                transitioningOutViews,
                transitionDirection: TransitionDirection.Outward
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
            const activeView = {...prevState.activeView, type: prevState.activeView.type + 1};
            const transitioningOutViews = {...prevState.transitioningOutViews, [getViewId(prevState.activeView)]: prevState.activeView};
            delete transitioningOutViews[getViewId(activeView)];

            return {
                ...prevState,
                activeView,
                transitioningOutViews,
                transitionDirection: TransitionDirection.Inward
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

        setState(prevState =>
        {
            const activeView = {...prevState.activeView, timeFrame: getNextTimeFrame(direction)};
            const transitioningOutViews = {...prevState.transitioningOutViews, [getViewId(prevState.activeView)]: prevState.activeView};
            delete transitioningOutViews[getViewId(activeView)];

            return {
                ...prevState,
                activeView,
                transitioningOutViews,
                transitionDirection: direction
            };
        });
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

        setState(prevState =>
        {
            const activeView = {...prevState.activeView, type: ViewType.Date, timeFrame: todayTimeFrame};
            const transitioningOutViews = {...prevState.transitioningOutViews, [getViewId(prevState.activeView)]: prevState.activeView};
            delete transitioningOutViews[getViewId(activeView)];

            return {
                ...prevState,
                activeView,
                transitioningOutViews,
                transitionDirection: getTransitionDirection(thisMonth)
            };
        });
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

        setState(prevState =>
        {
            const activeView = {...prevState.activeView, type: ViewType.Date, timeFrame: selectedDateTimeFrame};
            const transitioningOutViews = {...prevState.transitioningOutViews, [getViewId(prevState.activeView)]: prevState.activeView};
            delete transitioningOutViews[getViewId(activeView)];

            return {
                ...prevState,
                activeView,
                transitioningOutViews,
                transitionDirection: getTransitionDirection(selectedDate)
            };
        });
    }

    function getNextTimeFrame(direction: TransitionDirection): TimeFrame
    {
        const timeFrame: TimeFrame = {
            decade: undefined,
            monthAndYear: new Date(state.activeView.timeFrame.monthAndYear)
        };

        switch (state.activeView.type)
        {
            case ViewType.Date:
            {
                const monthStep = direction === TransitionDirection.Forward ? 1 : -1;
                timeFrame.monthAndYear.setMonth(timeFrame.monthAndYear.getMonth() + monthStep);
                timeFrame.decade = GregorianCalendar.getDecade(timeFrame.monthAndYear.getFullYear());

                break;
            }

            case ViewType.Month:
            {
                const yearStep = direction === TransitionDirection.Forward ? 1 : -1;
                timeFrame.monthAndYear.setFullYear(timeFrame.monthAndYear.getFullYear() + yearStep);
                timeFrame.decade = GregorianCalendar.getDecade(timeFrame.monthAndYear.getFullYear());

                break;
            }

            case ViewType.Year:
            {
                const decadeStep = direction === TransitionDirection.Forward
                    ? GregorianCalendar.YEAR_COUNT_IN_DECADE
                    : -1 * GregorianCalendar.YEAR_COUNT_IN_DECADE;

                timeFrame.decade = (GregorianCalendar.getDecade(timeFrame.monthAndYear.getFullYear()) + decadeStep) as Decade;
                timeFrame.monthAndYear.setFullYear(timeFrame.decade, 0, 1);

                break;
            }
        }

        return timeFrame;
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

    function onViewIsReadyToUnmount(viewId: string): void
    {
        setState(prevState => ({
            ...prevState,
            transitioningOutViews: Object.fromEntries(Object.entries(prevState.transitioningOutViews).filter(entry => entry[0] !== viewId))
        }));
    }
}
