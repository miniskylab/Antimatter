import {ButtonContextHook, ButtonStyle} from "@miniskylab/antimatter-button";
import {GregorianCalendar} from "@miniskylab/antimatter-framework";
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
    const navigatorDirectionContext = Header.ContextHook.useNavigatorDirectionContext();

    const inheritedIconStyle = Default(calendarContext.props, calendarContext.state)
        .Header(headerContext.props)
        .Navigator(buttonContext.props, buttonContext.state)
        .Icon(iconProps);

    const iconStyle: ReturnType<IconStyle> = {...inheritedIconStyle};

    iconStyle.Root = {
        ...inheritedIconStyle.Root,
        fontSize: 24,
        ...navigatorDirectionContext === "backward" && {paddingRight: 3},
        ...navigatorDirectionContext === "forward" && {paddingLeft: 3}
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
        width: 60,
        height: 60,
        borderWidth: 5,
        borderRadius: 30
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
        fontSize: 24
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
        height: 420
    };

    return transitionStyle;
};

const Calendar__DateView__WeekNo: LabelStyle = function (labelProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();
    const dateViewContext = DateView.ContextHook.useDateViewContext();

    const inheritedLabelStyle = Default(calendarContext.props, calendarContext.state)
        .DateView(dateViewContext.props)
        .WeekNo(labelProps);

    const labelStyle: ReturnType<LabelStyle> = {...inheritedLabelStyle};

    labelStyle.Root = {
        ...inheritedLabelStyle.Root,
        width: 60,
        height: 60,
        fontSize: 20
    };

    return labelStyle;
};

const Calendar__DateView__WeekOfYear: LabelStyle = function (labelProps)
{
    const weekNoStyle = Calendar__DateView__WeekNo(labelProps);
    const labelStyle: ReturnType<LabelStyle> = {...weekNoStyle};

    labelStyle.Root = {
        ...weekNoStyle.Root,
        fontSize: 15
    };

    return labelStyle;
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
        width: 60,
        height: 60,
        fontSize: 21
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
        width: 58,
        height: 58,
        borderWidth: 4,
        borderRadius: 29
    };

    return buttonStyle;
};

const Calendar__DateView__DateNumber: LabelStyle = function (labelProps)
{
    const dateContext = DateView.ContextHook.useDateContext();
    const calendarContext = CalendarContextHook.useCalendarContext();
    const dateViewContext = DateView.ContextHook.useDateViewContext();

    const isToday = GregorianCalendar.isEqualDate(dateContext.value, dateViewContext.props.today);

    const inheritedLabelStyle = Default(calendarContext.props, calendarContext.state)
        .DateView(dateViewContext.props)
        .DateNumber(labelProps);

    const labelStyle: ReturnType<LabelStyle> = {...inheritedLabelStyle};

    labelStyle.Root = {
        ...inheritedLabelStyle.Root,
        fontSize: 18,
        ...isToday && {
            fontSize: 17
        }
    };

    return labelStyle;
};

const Calendar__DateView__TodayText: LabelStyle = function (labelProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();
    const dateViewContext = DateView.ContextHook.useDateViewContext();

    const inheritedLabelStyle = Default(calendarContext.props, calendarContext.state)
        .DateView(dateViewContext.props)
        .TodayText(labelProps);

    const labelStyle: ReturnType<LabelStyle> = {...inheritedLabelStyle};

    labelStyle.Root = {
        ...inheritedLabelStyle.Root,
        height: 20,
        marginTop: 6,
        fontSize: 15
    };

    return labelStyle;
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
        fontSize: 21
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
        width: 106,
        height: 91,
        borderWidth: 4,
        margin: 7
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
        fontSize: 21
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
        width: 106,
        height: 91,
        borderWidth: 4,
        margin: 7
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

const Calendar__Control__Button__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const controlContext = Control.ContextHook.useControlContext();
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedIconStyle = Default(calendarContext.props, calendarContext.state)
        .Control(controlContext.props)
        .Button(buttonContext.props, buttonContext.state)
        .Icon(iconProps);

    const iconStyle: ReturnType<IconStyle> = {...inheritedIconStyle};

    iconStyle.Root = {
        ...inheritedIconStyle.Root,
        minWidth: 18,
        height: 18,
        fontSize: 18
    };

    return iconStyle;
};

const Calendar__Control__Button__Label: LabelStyle = function (labelProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const calendarContext = CalendarContextHook.useCalendarContext();
    const controlContext = Control.ContextHook.useControlContext();

    const inheritedLabelStyle = Default(calendarContext.props, calendarContext.state)
        .Control(controlContext.props)
        .Button(buttonContext.props, buttonContext.state)
        .Label(labelProps);

    const labelStyle: ReturnType<LabelStyle> = {...inheritedLabelStyle};

    labelStyle.Root = {
        ...inheritedLabelStyle.Root,
        marginLeft: 8,
        fontSize: 18
    };

    return labelStyle;
};

const Calendar__Control__Button: ButtonStyle = function (buttonProps, buttonState)
{
    const controlContext = Control.ContextHook.useControlContext();
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedButtonStyle = Default(calendarContext.props, calendarContext.state)
        .Control(controlContext.props)
        .Button(buttonProps, buttonState);

    const buttonStyle: ReturnType<ButtonStyle> = {...inheritedButtonStyle};

    buttonStyle.Root = {
        ...inheritedButtonStyle.Root,
        minWidth: 120,
        width: 120,
        height: 51,
        borderWidth: 3
    };

    buttonStyle.Icon = Calendar__Control__Button__Icon;
    buttonStyle.Label = Calendar__Control__Button__Label;

    return buttonStyle;
};

const Calendar__Control: Control.Style = function (controlProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();

    const inheritedControlStyle = Default(calendarContext.props, calendarContext.state).Control(controlProps);
    const controlStyle: ReturnType<Control.Style> = {...inheritedControlStyle};

    controlStyle.Button = Calendar__Control__Button;

    return controlStyle;
};

export const Sesquialteral: CalendarStyle = function (calendarProps, calendarState)
{
    const defaultCalendarStyle = Default(calendarProps, calendarState);
    const calendarStyle: ReturnType<CalendarStyle> = {...defaultCalendarStyle};

    calendarStyle.Root = {
        ...defaultCalendarStyle.Root,
        width: 480
    };

    calendarStyle.Header = Calendar__Header;
    calendarStyle.ViewTransition = Calendar__ViewTransition;
    calendarStyle.DateView = Calendar__DateView;
    calendarStyle.MonthView = Calendar__MonthView;
    calendarStyle.YearView = Calendar__YearView;
    calendarStyle.Control = Calendar__Control;

    return calendarStyle;
};
