import {ButtonContextHook, type ButtonStyle} from "@miniskylab/antimatter-button";
import {Ts} from "@miniskylab/antimatter-framework";
import {type IconStyle} from "@miniskylab/antimatter-icon";
import {type PressableStyle} from "@miniskylab/antimatter-pressable";
import {type TextStyle} from "@miniskylab/antimatter-text";
import {type TransitionStyle} from "@miniskylab/antimatter-transition";
import {type ViewStyle} from "@miniskylab/antimatter-view";
import {Control, DateView, Header, MonthView, YearView} from "../components";
import {CalendarContextHook} from "../hooks";
import {type CalendarStyle} from "../models";
import {Default} from "./default";

const Calendar__Root: ViewStyle = function (viewProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state).Root(viewProps);

    return {
        ...inheritedStyle,
        width: 480
    };
};

const Calendar__Header__Navigator__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const headerContext = Header.ContextHook.useHeaderContext();
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state)
        .Header(headerContext.props)
        .Navigator(buttonContext.props)
        .Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        width: 60,
        height: 60,
        borderWidth: 5,
        borderRadius: 30
    };
};

const Calendar__Header__Navigator__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const headerContext = Header.ContextHook.useHeaderContext();
    const calendarContext = CalendarContextHook.useCalendarContext();
    const navigatorDirectionContext = Header.ContextHook.useNavigatorDirectionContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state)
        .Header(headerContext.props)
        .Navigator(buttonContext.props)
        .Icon(iconProps);

    return {
        ...inheritedStyle,
        fontSize: 24,
        ...navigatorDirectionContext === "backward" && {paddingRight: 3},
        ...navigatorDirectionContext === "forward" && {paddingLeft: 3}
    };
};

const Calendar__Header__Navigator: ButtonStyle = function (buttonProps)
{
    const headerContext = Header.ContextHook.useHeaderContext();
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state)
        .Header(headerContext.props)
        .Navigator(buttonProps);

    return {
        ...inheritedStyle,
        Root: Calendar__Header__Navigator__Root,
        Icon: Calendar__Header__Navigator__Icon
    };
};

const Calendar__Header__Headline__Label: TextStyle = function (textProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const headerContext = Header.ContextHook.useHeaderContext();
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state)
        .Header(headerContext.props)
        .Headline(buttonContext.props)
        .Label(textProps);

    return {
        ...inheritedStyle,
        fontSize: 24
    };
};

const Calendar__Header__Headline: ButtonStyle = function (buttonProps)
{
    const headerContext = Header.ContextHook.useHeaderContext();
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state)
        .Header(headerContext.props)
        .Headline(buttonProps);

    return {
        ...inheritedStyle,
        Label: Calendar__Header__Headline__Label
    };
};

const Calendar__Header: Header.Style = function (headerProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state).Header(headerProps);

    return {
        ...inheritedStyle,
        Navigator: Calendar__Header__Navigator,
        Headline: Calendar__Header__Headline
    };
};

const Calendar__ViewTransition: TransitionStyle = function (transitionProps, transitionState)
{
    return function (viewProps)
    {
        const calendarContext = CalendarContextHook.useCalendarContext();

        const inheritedStyle = Default(calendarContext.props, calendarContext.state)
            .ViewTransition(transitionProps, transitionState)(viewProps);

        return {
            ...inheritedStyle,
            height: 420
        };
    };
};

const Calendar__DateView__WeekNo: TextStyle = function (textProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();
    const dateViewContext = DateView.ContextHook.useDateViewContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state)
        .DateView(dateViewContext.props)
        .WeekNo(textProps);

    return {
        ...inheritedStyle,
        width: 60,
        height: 60,
        fontSize: 20
    };
};

const Calendar__DateView__WeekOfYear: TextStyle = function (textProps)
{
    return {
        ...Calendar__DateView__WeekNo(textProps),
        fontSize: 15
    };
};

const Calendar__DateView__DayOfWeek: TextStyle = function (textProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();
    const dateViewContext = DateView.ContextHook.useDateViewContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state)
        .DateView(dateViewContext.props)
        .DayOfWeek(textProps);

    return {
        ...inheritedStyle,
        width: 60,
        height: 60,
        fontSize: 21
    };
};

const Calendar__DateView__DateContainer: PressableStyle = function (pressableProps, pressableState)
{
    const calendarContext = CalendarContextHook.useCalendarContext();
    const dateViewContext = DateView.ContextHook.useDateViewContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state)
        .DateView(dateViewContext.props)
        .DateContainer(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        width: 58,
        height: 58,
        borderWidth: 4,
        borderRadius: 29
    };
};

const Calendar__DateView__DateNumber: TextStyle = function (textProps)
{
    const dateContext = DateView.ContextHook.useDateContext();
    const calendarContext = CalendarContextHook.useCalendarContext();
    const dateViewContext = DateView.ContextHook.useDateViewContext();

    const isToday = Ts.Date.isEqualDate(dateContext.value, dateViewContext.props.today);

    const inheritedStyle = Default(calendarContext.props, calendarContext.state)
        .DateView(dateViewContext.props)
        .DateNumber(textProps);

    return {
        ...inheritedStyle,
        fontSize: 18,
        ...isToday && {
            fontSize: 17
        }
    };
};

const Calendar__DateView__TodayText: TextStyle = function (textProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();
    const dateViewContext = DateView.ContextHook.useDateViewContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state)
        .DateView(dateViewContext.props)
        .TodayText(textProps);

    return {
        ...inheritedStyle,
        height: 20,
        marginTop: 6,
        fontSize: 15
    };
};

const Calendar__DateView: DateView.Style = function (dateViewProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state).DateView(dateViewProps);

    return {
        ...inheritedStyle,
        WeekNo: Calendar__DateView__WeekNo,
        WeekOfYear: Calendar__DateView__WeekOfYear,
        DayOfWeek: Calendar__DateView__DayOfWeek,
        DateContainer: Calendar__DateView__DateContainer,
        DateNumber: Calendar__DateView__DateNumber,
        TodayText: Calendar__DateView__TodayText
    };
};

const Calendar__MonthView__GridCell__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const calendarContext = CalendarContextHook.useCalendarContext();
    const monthViewContext = MonthView.ContextHook.useMonthViewContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state)
        .MonthView(monthViewContext.props)
        .GridCell(buttonContext.props)
        .Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        width: 106,
        height: 91,
        borderWidth: 4,
        margin: 7
    };
};

const Calendar__MonthView__GridCell__Label: TextStyle = function (textProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const calendarContext = CalendarContextHook.useCalendarContext();
    const monthViewContext = MonthView.ContextHook.useMonthViewContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state)
        .MonthView(monthViewContext.props)
        .GridCell(buttonContext.props)
        .Label(textProps);

    return {
        ...inheritedStyle,
        fontSize: 21
    };
};

const Calendar__MonthView__GridCell: ButtonStyle = function (buttonProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();
    const monthViewContext = MonthView.ContextHook.useMonthViewContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state)
        .MonthView(monthViewContext.props)
        .GridCell(buttonProps);

    return {
        ...inheritedStyle,
        Root: Calendar__MonthView__GridCell__Root,
        Label: Calendar__MonthView__GridCell__Label
    };
};

const Calendar__MonthView: MonthView.Style = function (monthViewProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state).MonthView(monthViewProps);

    return {
        ...inheritedStyle,
        GridCell: Calendar__MonthView__GridCell
    };
};

const Calendar__YearView__GridCell__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const calendarContext = CalendarContextHook.useCalendarContext();
    const yearViewContext = YearView.ContextHook.useYearViewContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state)
        .YearView(yearViewContext.props)
        .GridCell(buttonContext.props)
        .Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        width: 106,
        height: 91,
        borderWidth: 4,
        margin: 7
    };
};

const Calendar__YearView__GridCell__Label: TextStyle = function (textProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const calendarContext = CalendarContextHook.useCalendarContext();
    const yearViewContext = YearView.ContextHook.useYearViewContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state)
        .YearView(yearViewContext.props)
        .GridCell(buttonContext.props)
        .Label(textProps);

    return {
        ...inheritedStyle,
        fontSize: 21
    };
};

const Calendar__YearView__GridCell: ButtonStyle = function (buttonProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();
    const yearViewContext = YearView.ContextHook.useYearViewContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state)
        .YearView(yearViewContext.props)
        .GridCell(buttonProps);

    return {
        ...inheritedStyle,
        Root: Calendar__YearView__GridCell__Root,
        Label: Calendar__YearView__GridCell__Label
    };
};

const Calendar__YearView: YearView.Style = function (yearViewProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state).YearView(yearViewProps);

    return {
        ...inheritedStyle,
        GridCell: Calendar__YearView__GridCell
    };
};

const Calendar__Control__Button__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const controlContext = Control.ContextHook.useControlContext();
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state)
        .Control(controlContext.props)
        .Button(buttonContext.props)
        .Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        minWidth: 120,
        width: 120,
        height: 51,
        borderWidth: 3
    };
};

const Calendar__Control__Button__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const controlContext = Control.ContextHook.useControlContext();
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state)
        .Control(controlContext.props)
        .Button(buttonContext.props)
        .Icon(iconProps);

    return {
        ...inheritedStyle,
        minWidth: 18,
        height: 18,
        fontSize: 18
    };
};

const Calendar__Control__Button__Label: TextStyle = function (textProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const calendarContext = CalendarContextHook.useCalendarContext();
    const controlContext = Control.ContextHook.useControlContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state)
        .Control(controlContext.props)
        .Button(buttonContext.props)
        .Label(textProps);

    return {
        ...inheritedStyle,
        marginLeft: 8,
        fontSize: 18
    };
};

const Calendar__Control__Button: ButtonStyle = function (buttonProps)
{
    const controlContext = Control.ContextHook.useControlContext();
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state)
        .Control(controlContext.props)
        .Button(buttonProps);

    return {
        ...inheritedStyle,
        Root: Calendar__Control__Button__Root,
        Icon: Calendar__Control__Button__Icon,
        Label: Calendar__Control__Button__Label
    };
};

const Calendar__Control: Control.Style = function (controlProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedStyle = Default(calendarContext.props, calendarContext.state).Control(controlProps);

    return {
        ...inheritedStyle,
        Button: Calendar__Control__Button
    };
};

export const Sesquialteral: CalendarStyle = function (calendarProps, calendarState)
{
    return {
        ...Default(calendarProps, calendarState),
        Root: Calendar__Root,
        Header: Calendar__Header,
        ViewTransition: Calendar__ViewTransition,
        DateView: Calendar__DateView,
        MonthView: Calendar__MonthView,
        YearView: Calendar__YearView,
        Control: Calendar__Control
    };
};
