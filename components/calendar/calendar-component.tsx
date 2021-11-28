import {Transition} from "@miniskylab/antimatter-transition";
import {Char, Decade, GregorianCalendar} from "@miniskylab/antimatter-typescript";
import React, {Component} from "react";
import {Controls} from "./components/controls";
import {DateView, getDateViewData} from "./components/date-view";
import {Header} from "./components/header";
import {MonthView} from "./components/month-view";
import {YearView} from "./components/year-view";
import {canNavigateBackward, canNavigateForward} from "./helpers/calendar-time-frame";
import {CalendarComponentProps} from "./models/calendar-component-props";
import {CalendarComponentState} from "./models/calendar-component-state";
import {CalendarTimeFrame} from "./models/calendar-time-frame";
import {CalendarTransitionDirection} from "./models/calendar-transition-direction";
import {CalendarView} from "./models/calendar-view";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export class CalendarComponent extends Component<CalendarComponentProps, CalendarComponentState>
{
    constructor(props: CalendarComponentProps)
    {
        super(props);

        const selectedDate = props.selectedDate
            ? new Date(props.selectedDate)
            : new Date();
        selectedDate.setDate(1);
        selectedDate.setHours(0, 0, 0, 0);

        this.state = {
            view: CalendarView.Date,
            transitionDirection: CalendarTransitionDirection.None,
            timeFrame: {
                monthAndYear: selectedDate,
                decade: GregorianCalendar.getDecade(selectedDate.getFullYear())
            }
        };
    }

    render(): JSX.Element
    {
        return (
            <div className={this.props.variant["calendar"]} tabIndex={-1} onBlur={this.props.onBlur}>
                {this.renderHeader()}
                {this.renderView()}
                {this.renderControls()}
            </div>
        );
    }

    private getHeadline(): string
    {
        switch (this.state.view)
        {
            case CalendarView.Date:
            {
                const date = this.state.timeFrame.monthAndYear;

                return `${GregorianCalendar.getFullMonthName(date.getMonth())}${Char.space}${Char.space}${date.getFullYear()}`;
            }

            case CalendarView.Month:
            {
                return `${this.state.timeFrame.monthAndYear.getFullYear()}`;
            }

            case CalendarView.Year:
            {
                const decadeFirstYear = this.state.timeFrame.decade;
                const decadeLastYear = decadeFirstYear + GregorianCalendar.YEAR_COUNT_IN_DECADE - 1;

                return `${decadeFirstYear} - ${decadeLastYear}`;
            }
        }
    }

    private renderHeader(): JSX.Element
    {
        return (
            <Header
                variant={this.props.componentVariant.header}
                headline={this.getHeadline()}
                onPrevClick={
                    canNavigateBackward(this.state.view, this.state.timeFrame)
                        ? () => { this.navigate(CalendarTransitionDirection.Backward); }
                        : undefined
                }
                onHeadlineClick={
                    this.state.view < CalendarView.Year
                        ? () => { this.zoomOut(); }
                        : undefined
                }
                onNextClick={
                    canNavigateForward(this.state.view, this.state.timeFrame)
                        ? () => { this.navigate(CalendarTransitionDirection.Forward); }
                        : undefined
                }
            />
        );
    }

    private renderView(): JSX.Element
    {
        return (
            <Transition
                childIdentifier={`${this.state.view}-${this.state.timeFrame.monthAndYear}-${this.state.timeFrame.decade}`}
                classNames={{
                    enter: this.props.variant[`calendar__transition--${this.state.transitionDirection}-in-start`],
                    enterActive: this.props.variant[`calendar__transition--${this.state.transitionDirection}-in-in-progress`],
                    exit: this.props.variant[`calendar__transition--${this.state.transitionDirection}-out-start`],
                    exitActive: this.props.variant[`calendar__transition--${this.state.transitionDirection}-out-in-progress`]
                }}
            >
                {
                    this.state.view === CalendarView.Date && (
                        <DateView
                            variant={this.props.componentVariant.dateView}
                            selectedDate={this.props.selectedDate}
                            displayingMonth={this.state.timeFrame.monthAndYear}
                            onDateClick={this.onDateClick.bind(this)}
                        />
                    ) || this.state.view === CalendarView.Month && (
                        <MonthView
                            variant={this.props.componentVariant.monthView}
                            displayingYear={this.state.timeFrame.monthAndYear.getFullYear()}
                            onMonthClick={this.onMonthClick.bind(this)}
                        />
                    ) || this.state.view === CalendarView.Year && (
                        <YearView
                            variant={this.props.componentVariant.yearView}
                            displayingDecade={this.state.timeFrame.decade}
                            onYearClick={this.onYearClick.bind(this)}
                        />
                    )
                }
            </Transition>
        );
    }

    private renderControls(): JSX.Element
    {
        return (
            <Controls
                variant={this.props.componentVariant.controls}
                onTodayButtonClick={
                    this.state.view !== CalendarView.Date || !this.isWithinTimeFrame(new Date())
                        ? () => { this.goToToday(); }
                        : null
                }
                onSelectionButtonClick={
                    this.props.selectedDate && (this.state.view !== CalendarView.Date || !this.isWithinTimeFrame(this.props.selectedDate))
                        ? () => { this.goToSelectedDate(); }
                        : null
                }
            />
        );
    }

    private zoomIn(timeFrame: CalendarTimeFrame): void
    {
        if (this.state.view === CalendarView.Date)
        {
            return;
        }

        this.setState({
            transitionDirection: CalendarTransitionDirection.Outward,
            view: this.state.view - 1,
            timeFrame
        });
    }

    private zoomOut(): void
    {
        if (this.state.view === CalendarView.Year)
        {
            return;
        }

        this.setState({
            transitionDirection: CalendarTransitionDirection.Inward,
            view: this.state.view + 1
        });
    }

    private navigate(direction: CalendarTransitionDirection): void
    {
        const canNavigate = (
            (direction === CalendarTransitionDirection.Forward && canNavigateForward(this.state.view, this.state.timeFrame))
            ||
            (direction === CalendarTransitionDirection.Backward && canNavigateBackward(this.state.view, this.state.timeFrame))
        );

        if (!canNavigate)
        {
            return;
        }

        let decade: Decade;
        const monthAndYear = new Date(this.state.timeFrame.monthAndYear);

        switch (this.state.view)
        {
            case CalendarView.Date:
            {
                const monthStep = direction === CalendarTransitionDirection.Forward ? 1 : -1;
                monthAndYear.setMonth(monthAndYear.getMonth() + monthStep);
                decade = GregorianCalendar.getDecade(monthAndYear.getFullYear());

                break;
            }

            case CalendarView.Month:
            {
                const yearStep = direction === CalendarTransitionDirection.Forward ? 1 : -1;
                monthAndYear.setFullYear(monthAndYear.getFullYear() + yearStep);
                decade = GregorianCalendar.getDecade(monthAndYear.getFullYear());

                break;
            }

            case CalendarView.Year:
            {
                const decadeStep = direction === CalendarTransitionDirection.Forward
                    ? GregorianCalendar.YEAR_COUNT_IN_DECADE
                    : -1 * GregorianCalendar.YEAR_COUNT_IN_DECADE;

                decade = (GregorianCalendar.getDecade(monthAndYear.getFullYear()) + decadeStep) as Decade;
                monthAndYear.setFullYear(decade, 0, 1);

                break;
            }
        }

        this.setState({
            transitionDirection: direction,
            timeFrame: {monthAndYear, decade}
        });
    }

    private goToToday(): void
    {
        const thisMonth = new Date();
        thisMonth.setDate(1);
        thisMonth.setHours(0, 0, 0, 0);

        this.setState({
            view: CalendarView.Date,
            transitionDirection: this.getTransitionDirection(thisMonth),
            timeFrame: {
                monthAndYear: thisMonth,
                decade: GregorianCalendar.getDecade(thisMonth.getFullYear())
            }
        });
    }

    private goToSelectedDate(): void
    {
        if (!this.props.selectedDate)
        {
            return;
        }

        this.setState({
            view: CalendarView.Date,
            transitionDirection: this.getTransitionDirection(this.props.selectedDate),
            timeFrame: {
                monthAndYear: this.props.selectedDate,
                decade: GregorianCalendar.getDecade(this.props.selectedDate.getFullYear())
            }
        });
    }

    private getTransitionDirection(toDate: Date): CalendarTransitionDirection
    {
        return this.state.view > CalendarView.Date
            ? CalendarTransitionDirection.Outward
            : toDate < this.state.timeFrame.monthAndYear
                ? CalendarTransitionDirection.Backward
                : CalendarTransitionDirection.Forward;
    }

    private isWithinTimeFrame(date: Date): boolean
    {
        const dateViewData = getDateViewData(this.state.timeFrame.monthAndYear);
        return dateViewData.flat().filter(x => GregorianCalendar.isEqualDate(x, date))?.length > 0;
    }

    private onDateClick(date: Date): void
    {
        this.props.onChange?.(
            GregorianCalendar.isEqualDate(date, this.props.selectedDate)
                ? undefined
                : date
        );
    }

    private onMonthClick(month: Date): void
    {
        this.zoomIn({
            monthAndYear: month,
            decade: GregorianCalendar.getDecade(month.getFullYear())
        });
    }

    private onYearClick(year: number): void
    {
        this.zoomIn({
            monthAndYear: new Date(year, 0, 1),
            decade: GregorianCalendar.getDecade(year)
        });
    }
}
