import {ButtonContextHook, ButtonStyle} from "@miniskylab/antimatter-button";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {TransitionStyle} from "@miniskylab/antimatter-transition";
import {Control, DateView, Header, MonthView, YearView} from "../component";
import {CalendarContextHook} from "../hook";
import {CalendarStyle} from "../model";
import {Default} from "./default";

const Calendar__Header__Navigator__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const headerContext = Header.ContextHook.useHeaderContext();
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedIconStyle = Default(calendarContext.props, calendarContext.state)
        .Header(headerContext.props)
        .Navigator(buttonContext.props, buttonContext.state)
        .Icon(iconProps);

    const iconStyle: ReturnType<IconStyle> = {...inheritedIconStyle};

    iconStyle.Root = {
        ...inheritedIconStyle.Root,
        fontSize: 18
    };

    return iconStyle;
};

const Calendar__Header__Navigator: ButtonStyle = function (buttonProps, buttonState)
{
    const headerContext = Header.ContextHook.useHeaderContext();
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedButtonStyle = Default(calendarContext.props, calendarContext.state)
        .Header(headerContext.props)
        .Navigator(buttonProps, buttonState);

    const buttonStyle: ReturnType<ButtonStyle> = {...inheritedButtonStyle};

    buttonStyle.Root = {
        ...inheritedButtonStyle.Root,
        width: 36,
        height: 36,
        borderRadius: 18
    };

    buttonStyle.Icon = Calendar__Header__Navigator__Icon;

    return buttonStyle;
};

const Calendar__Header__Headline__Label: LabelStyle = function (labelProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const headerContext = Header.ContextHook.useHeaderContext();
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedLabelStyle = Default(calendarContext.props, calendarContext.state)
        .Header(headerContext.props)
        .Headline(buttonContext.props, buttonContext.state)
        .Label(labelProps);

    const labelStyle: ReturnType<LabelStyle> = {...inheritedLabelStyle};

    labelStyle.Root = {
        ...inheritedLabelStyle.Root,
        fontSize: 18
    };

    return labelStyle;
};

const Calendar__Header__Headline: ButtonStyle = function (buttonProps, buttonState)
{
    const headerContext = Header.ContextHook.useHeaderContext();
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedButtonStyle = Default(calendarContext.props, calendarContext.state)
        .Header(headerContext.props)
        .Headline(buttonProps, buttonState);

    const buttonStyle: ReturnType<ButtonStyle> = {...inheritedButtonStyle};

    buttonStyle.Label = Calendar__Header__Headline__Label;

    return buttonStyle;
};

const Calendar__Header: Header.Style = function (headerProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedHeaderStyle = Default(calendarContext.props, calendarContext.state).Header(headerProps);
    const headerStyle: ReturnType<Header.Style> = {...inheritedHeaderStyle};

    headerStyle.Navigator = Calendar__Header__Navigator;
    headerStyle.Headline = Calendar__Header__Headline;

    return headerStyle;
};

const Calendar__ViewTransition: TransitionStyle = function (transitionProps, transitionState)
{
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedTransitionStyle = Default(calendarContext.props, calendarContext.state).ViewTransition(transitionProps, transitionState);
    const transitionStyle: ReturnType<ButtonStyle> = {...inheritedTransitionStyle};

    transitionStyle.Root = {
        ...inheritedTransitionStyle.Root,
        height: 252
    };

    return transitionStyle;
};

const Calendar__DateView__WeekNo: LabelStyle = function ()
{
    return {
        Root: {
            display: "none"
        }
    };
};

const Calendar__DateView__WeekOfYear: LabelStyle = function ()
{
    return {
        Root: {
            display: "none"
        }
    };
};

const Calendar__DateView__DayOfWeek: LabelStyle = function (labelProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();
    const dateViewContext = DateView.ContextHook.useDateViewContext();

    const inheritedLabelStyle = Default(calendarContext.props, calendarContext.state)
        .DateView(dateViewContext.props)
        .DayOfWeek(labelProps);

    const labelStyle: ReturnType<LabelStyle> = {...inheritedLabelStyle};

    labelStyle.Root = {
        ...inheritedLabelStyle.Root,
        width: 36,
        height: 36,
        fontSize: 16
    };

    return labelStyle;
};

const Calendar__DateView__DateContainer: ButtonStyle = function (buttonProps, buttonState)
{
    const calendarContext = CalendarContextHook.useCalendarContext();
    const dateViewContext = DateView.ContextHook.useDateViewContext();

    const inheritedButtonStyle = Default(calendarContext.props, calendarContext.state)
        .DateView(dateViewContext.props)
        .DateContainer(buttonProps, buttonState);

    const buttonStyle: ReturnType<ButtonStyle> = {...inheritedButtonStyle};

    buttonStyle.Root = {
        ...inheritedButtonStyle.Root,
        width: 34,
        height: 34,
        borderRadius: 17
    };

    return buttonStyle;
};

const Calendar__DateView__DateNumber: LabelStyle = function (labelProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();
    const dateViewContext = DateView.ContextHook.useDateViewContext();

    const inheritedLabelStyle = Default(calendarContext.props, calendarContext.state)
        .DateView(dateViewContext.props)
        .DateNumber(labelProps);

    const labelStyle: ReturnType<LabelStyle> = {...inheritedLabelStyle};

    labelStyle.Root = {
        ...inheritedLabelStyle.Root,
        height: "auto",
        fontSize: 16,
        paddingTop: 0
    };

    return labelStyle;
};

const Calendar__DateView__TodayText: LabelStyle = function ()
{
    return {
        Root: {
            display: "none"
        }
    };
};

const Calendar__DateView: DateView.Style = function (dateViewProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedDateViewStyle = Default(calendarContext.props, calendarContext.state).DateView(dateViewProps);
    const dateViewStyle: ReturnType<DateView.Style> = {...inheritedDateViewStyle};

    dateViewStyle.WeekNo = Calendar__DateView__WeekNo;
    dateViewStyle.WeekOfYear = Calendar__DateView__WeekOfYear;
    dateViewStyle.DayOfWeek = Calendar__DateView__DayOfWeek;
    dateViewStyle.DateContainer = Calendar__DateView__DateContainer;
    dateViewStyle.DateNumber = Calendar__DateView__DateNumber;
    dateViewStyle.TodayText = Calendar__DateView__TodayText;

    return dateViewStyle;
};

const Calendar__MonthView__GridCell__Label: LabelStyle = function (labelProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const calendarContext = CalendarContextHook.useCalendarContext();
    const monthViewContext = MonthView.ContextHook.useMonthViewContext();

    const inheritedLabelStyle = Default(calendarContext.props, calendarContext.state)
        .MonthView(monthViewContext.props)
        .GridCell(buttonContext.props, buttonContext.state)
        .Label(labelProps);

    const labelStyle: ReturnType<LabelStyle> = {...inheritedLabelStyle};

    labelStyle.Root = {
        ...inheritedLabelStyle.Root,
        fontSize: 16
    };

    return labelStyle;
};

const Calendar__MonthView__GridCell: ButtonStyle = function (buttonProps, buttonState)
{
    const calendarContext = CalendarContextHook.useCalendarContext();
    const monthViewContext = MonthView.ContextHook.useMonthViewContext();

    const inheritedButtonStyle = Default(calendarContext.props, calendarContext.state)
        .MonthView(monthViewContext.props)
        .GridCell(buttonProps, buttonState);

    const buttonStyle: ReturnType<ButtonStyle> = {...inheritedButtonStyle};

    buttonStyle.Root = {
        ...inheritedButtonStyle.Root,
        width: 55,
        height: 55,
        margin: 4
    };

    buttonStyle.Label = Calendar__MonthView__GridCell__Label;

    return buttonStyle;
};

const Calendar__MonthView: MonthView.Style = function (monthViewProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedMonthViewStyle = Default(calendarContext.props, calendarContext.state).MonthView(monthViewProps);
    const monthViewStyle: ReturnType<MonthView.Style> = {...inheritedMonthViewStyle};

    monthViewStyle.GridCell = Calendar__MonthView__GridCell;

    return monthViewStyle;
};

const Calendar__YearView__GridCell__Label: LabelStyle = function (labelProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const calendarContext = CalendarContextHook.useCalendarContext();
    const yearViewContext = YearView.ContextHook.useYearViewContext();

    const inheritedLabelStyle = Default(calendarContext.props, calendarContext.state)
        .YearView(yearViewContext.props)
        .GridCell(buttonContext.props, buttonContext.state)
        .Label(labelProps);

    const labelStyle: ReturnType<LabelStyle> = {...inheritedLabelStyle};

    labelStyle.Root = {
        ...inheritedLabelStyle.Root,
        fontSize: 16
    };

    return labelStyle;
};

const Calendar__YearView__GridCell: ButtonStyle = function (buttonProps, buttonState)
{
    const calendarContext = CalendarContextHook.useCalendarContext();
    const yearViewContext = YearView.ContextHook.useYearViewContext();

    const inheritedButtonStyle = Default(calendarContext.props, calendarContext.state)
        .YearView(yearViewContext.props)
        .GridCell(buttonProps, buttonState);

    const buttonStyle: ReturnType<ButtonStyle> = {...inheritedButtonStyle};

    buttonStyle.Root = {
        ...inheritedButtonStyle.Root,
        width: 55,
        height: 55,
        margin: 4
    };

    buttonStyle.Label = Calendar__YearView__GridCell__Label;

    return buttonStyle;
};

const Calendar__YearView: YearView.Style = function (yearViewProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedYearViewStyle = Default(calendarContext.props, calendarContext.state).YearView(yearViewProps);
    const yearViewStyle: ReturnType<YearView.Style> = {...inheritedYearViewStyle};

    yearViewStyle.GridCell = Calendar__YearView__GridCell;

    return yearViewStyle;
};

const Calendar__Control: Control.Style = function ()
{
    return {
        Root: {
            display: "none"
        }
    };
};

export const Mini: CalendarStyle = function (calendarProps, calendarState)
{
    const defaultCalendarStyle = Default(calendarProps, calendarState);
    const calendarStyle: ReturnType<CalendarStyle> = {...defaultCalendarStyle};

    calendarStyle.Root = {
        ...defaultCalendarStyle.Root,
        width: 252
    };

    calendarStyle.Header = Calendar__Header;
    calendarStyle.ViewTransition = Calendar__ViewTransition;
    calendarStyle.DateView = Calendar__DateView;
    calendarStyle.MonthView = Calendar__MonthView;
    calendarStyle.YearView = Calendar__YearView;
    calendarStyle.Control = Calendar__Control;

    return calendarStyle;
};
