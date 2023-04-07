import {ButtonContextHook, ButtonStyle, ButtonVariant} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {GregorianCalendar} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";
import {TransitionStyle, TransitionVariant} from "@miniskylab/antimatter-transition";
import {Control, DateView, Header, MonthView, YearView} from "../component";
import {CalendarContextHook} from "../hook";
import {CalendarStyle} from "../model";

const Calendar__Header__Navigator__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const navigatorDirectionContext = Header.ContextHook.useNavigatorDirectionContext();

    const inheritedIconStyle = ButtonVariant.OutlinedCircular(buttonContext.props, buttonContext.state).Icon(iconProps);
    const iconStyle: ReturnType<IconStyle> = {...inheritedIconStyle};

    iconStyle.Root = {
        ...inheritedIconStyle.Root,
        fontSize: 16,
        color: buttonContext.state.pressed
            ? Color.Ambient
            : buttonContext.state.hovered
                ? Color.White
                : Color.Neutral,
        ...navigatorDirectionContext === "backward" && {paddingRight: 2},
        ...navigatorDirectionContext === "forward" && {paddingLeft: 2}
    };

    return iconStyle;
};

const Calendar__Header__Navigator: ButtonStyle = function (buttonProps, buttonState)
{
    const outlinedCircularButtonStyle = ButtonVariant.OutlinedCircular(buttonProps, buttonState);
    const buttonStyle: ReturnType<ButtonStyle> = {...outlinedCircularButtonStyle};

    buttonStyle.Root = {
        ...outlinedCircularButtonStyle.Root,
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 3,
        borderStyle: "solid",
        ...buttonState.pressed
            ? {
                borderColor: Color.Primary,
                backgroundColor: Color.Primary
            }
            : buttonState.hovered
                ? {
                    borderColor: Color.Primary,
                    backgroundColor: Color.Primary__a10
                }
                : {
                    borderColor: Color.Transparent,
                    backgroundColor: Color.Transparent
                }
    };

    buttonStyle.Icon = Calendar__Header__Navigator__Icon;

    return buttonStyle;
};

const Calendar__Header__Headline__Label: LabelStyle = function (labelProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedLabelStyle = ButtonVariant.OutlinedRectangular(buttonContext.props, buttonContext.state).Label(labelProps);
    const labelStyle: ReturnType<LabelStyle> = {...inheritedLabelStyle};

    labelStyle.Root = {
        ...inheritedLabelStyle.Root,
        fontSize: 16,
        fontWeight: "bold",
        color: buttonContext.state.pressed
            ? Color.Neutral
            : buttonContext.state.hovered
                ? Color.White
                : Color.Gainsboro
    };

    return labelStyle;
};

const Calendar__Header__Headline: ButtonStyle = function (buttonProps, buttonState)
{
    const outlinedRectangularButtonStyle = ButtonVariant.OutlinedRectangular(buttonProps, buttonState);
    const buttonStyle: ReturnType<ButtonStyle> = {...outlinedRectangularButtonStyle};

    buttonStyle.Root = {
        ...outlinedRectangularButtonStyle.Root,
        flexGrow: 1,
        minWidth: "auto",
        width: "auto",
        height: "auto",
        padding: 0,
        borderWidth: 0,
        backgroundColor: Color.Transparent,
        ...buttonProps.disabled && {
            opacity: 1,
            cursor: "default"
        }
    };

    buttonStyle.Label = Calendar__Header__Headline__Label;

    return buttonStyle;
};

const Calendar__Header: Header.Style = function ()
{
    const headerStyle: ReturnType<Header.Style> = {};

    headerStyle.Root = {
        flexDirection: "row"
    };

    headerStyle.Navigator = Calendar__Header__Navigator;
    headerStyle.Headline = Calendar__Header__Headline;

    return headerStyle;
};

const Calendar__ViewTransition: TransitionStyle = function (transitionProps, transitionState)
{
    const defaultTransitionStyle = TransitionVariant.Default(transitionProps, transitionState);
    const transitionStyle: ReturnType<ButtonStyle> = {...defaultTransitionStyle};

    transitionStyle.Root = {
        ...defaultTransitionStyle.Root,
        height: 280
    };

    return transitionStyle;
};

const Calendar__DateView__WeekNo: LabelStyle = function (labelProps)
{
    const defaultLabelStyle = LabelVariant.Default(labelProps);
    const labelStyle: ReturnType<LabelStyle> = {...defaultLabelStyle};

    labelStyle.Root = {
        ...defaultLabelStyle.Root,
        width: 40,
        height: 40,
        color: Color.White__a10,
        fontSize: 13,
        fontWeight: "bold"
    };

    return labelStyle;
};

const Calendar__DateView__WeekOfYear: LabelStyle = function (labelProps)
{
    const weekNoStyle = Calendar__DateView__WeekNo(labelProps);
    const labelStyle: ReturnType<LabelStyle> = {...weekNoStyle};

    labelStyle.Root = {
        ...weekNoStyle.Root,
        fontSize: 10
    };

    return labelStyle;
};

const Calendar__DateView__DayOfWeek: LabelStyle = function (labelProps)
{
    const defaultLabelStyle = LabelVariant.Default(labelProps);
    const labelStyle: ReturnType<LabelStyle> = {...defaultLabelStyle};

    labelStyle.Root = {
        ...defaultLabelStyle.Root,
        flexDirection: "column",
        width: 40,
        height: 40,
        color: Color.Gainsboro,
        fontSize: 14,
        fontWeight: "bold"
    };

    return labelStyle;
};

const Calendar__DateView__DateContainer: ButtonStyle = function (buttonProps, buttonState)
{
    const calendarContext = CalendarContextHook.useCalendarContext();
    const dateContext = DateView.ContextHook.useDateContext();
    const dateViewContext = DateView.ContextHook.useDateViewContext();

    const isToday = GregorianCalendar.isEqualDate(dateContext.value, dateViewContext.props.today);
    const isSelectedDate = GregorianCalendar.isEqualDate(dateContext.value, calendarContext.props.selectedDate);

    const outlinedCircularButtonStyle = ButtonVariant.OutlinedCircular(buttonProps, buttonState);
    const buttonStyle: ReturnType<ButtonStyle> = {...outlinedCircularButtonStyle};

    buttonStyle.Root = {
        ...outlinedCircularButtonStyle.Root,
        flexDirection: "column",
        flexWrap: "nowrap",
        width: 38,
        height: 38,
        margin: 1,
        borderRadius: 19,
        borderWidth: 3,
        borderStyle: "solid",
        borderColor: isToday
            ? dateContext.isExtraneous
                ? Color.White__a10
                : Color.Neutral
            : Color.Transparent,
        ...buttonState.hovered && {
            borderColor: Color.Primary,
            backgroundColor: Color.Primary__a10
        },
        ...buttonState.pressed && {
            borderColor: Color.Primary,
            backgroundColor: Color.Primary
        },
        ...isSelectedDate && {
            borderColor: Color.Primary,
            backgroundColor: Color.Primary
        }
    };

    return buttonStyle;
};

const Calendar__DateView__DateNumber: LabelStyle = function (labelProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();
    const dateContext = DateView.ContextHook.useDateContext();
    const buttonContext = ButtonContextHook.useButtonContext();
    const dateViewContext = DateView.ContextHook.useDateViewContext();

    const isToday = GregorianCalendar.isEqualDate(dateContext.value, dateViewContext.props.today);
    const isSelectedDate = GregorianCalendar.isEqualDate(dateContext.value, calendarContext.props.selectedDate);

    const defaultLabelStyle = LabelVariant.Default(labelProps);
    const labelStyle: ReturnType<LabelStyle> = {...defaultLabelStyle};

    labelStyle.Root = {
        ...defaultLabelStyle.Root,
        fontSize: 12,
        fontWeight: buttonContext.state.pressed || isSelectedDate ? "bold" : "normal",
        color: buttonContext.state.pressed || isSelectedDate
            ? Color.Ambient
            : buttonContext.state.hovered
                ? Color.White
                : dateContext.isExtraneous
                    ? Color.White__a10
                    : Color.Neutral,
        ...isToday && {
            height: 15,
            paddingTop: 3,
            fontSize: 11
        }
    };

    return labelStyle;
};

const Calendar__DateView__TodayText: LabelStyle = function (labelProps)
{
    const calendarContext = CalendarContextHook.useCalendarContext();
    const dateContext = DateView.ContextHook.useDateContext();
    const buttonContext = ButtonContextHook.useButtonContext();

    const isSelectedDate = GregorianCalendar.isEqualDate(dateContext.value, calendarContext.props.selectedDate);

    const defaultLabelStyle = LabelVariant.Default(labelProps);
    const labelStyle: ReturnType<LabelStyle> = {...defaultLabelStyle};

    labelStyle.Root = {
        ...defaultLabelStyle.Root,
        flexDirection: "column",
        height: 9,
        paddingTop: 4,
        fontSize: 10,
        fontWeight: buttonContext.state.pressed || isSelectedDate ? "bold" : "normal",
        color: buttonContext.state.pressed || isSelectedDate
            ? Color.Ambient
            : buttonContext.state.hovered
                ? Color.White
                : dateContext.isExtraneous
                    ? Color.White__a10
                    : Color.Neutral
    };

    return labelStyle;
};

const Calendar__DateView: DateView.Style = function ()
{
    const dateViewStyle: ReturnType<DateView.Style> = {};

    dateViewStyle.Root = {
        flexWrap: "wrap",
        flexDirection: "row",
        position: "absolute"
    };

    dateViewStyle.WeekNo = Calendar__DateView__WeekNo;
    dateViewStyle.WeekOfYear = Calendar__DateView__WeekOfYear;
    dateViewStyle.DayOfWeek = Calendar__DateView__DayOfWeek;
    dateViewStyle.DateContainer = Calendar__DateView__DateContainer;
    dateViewStyle.DateNumber = Calendar__DateView__DateNumber;
    dateViewStyle.TodayText = Calendar__DateView__TodayText;

    return dateViewStyle;
};

const Calendar__MonthView__GridCell__Icon: IconStyle = function ()
{
    const iconStyle: ReturnType<IconStyle> = {};

    iconStyle.Root = {
        display: "none"
    };

    return iconStyle;
};

const Calendar__MonthView__GridCell__Label: LabelStyle = function (labelProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const monthContext = MonthView.ContextHook.useMonthContext();
    const monthViewContext = MonthView.ContextHook.useMonthViewContext();

    const isSelectedMonth = GregorianCalendar.isEqualMonth(monthContext.value, monthViewContext.props.selectedMonth);

    const defaultLabelStyle = LabelVariant.Default(labelProps);
    const labelStyle: ReturnType<LabelStyle> = {...defaultLabelStyle};

    labelStyle.Root = {
        ...defaultLabelStyle.Root,
        fontSize: 14,
        fontWeight: isSelectedMonth ? "bold" : "normal",
        color: buttonContext.state.pressed
            ? Color.Ambient
            : buttonContext.state.hovered
                ? Color.White
                : monthContext.isExtraneous
                    ? Color.White__a10
                    : Color.Neutral
    };

    return labelStyle;
};

const Calendar__MonthView__GridCell: ButtonStyle = function (buttonProps, buttonState)
{
    const monthContext = MonthView.ContextHook.useMonthContext();
    const monthViewContext = MonthView.ContextHook.useMonthViewContext();

    const isSelectedMonth = GregorianCalendar.isEqualMonth(monthContext.value, monthViewContext.props.selectedMonth);

    const outlinedRectangularButtonStyle = ButtonVariant.OutlinedRectangular(buttonProps, buttonState);
    const buttonStyle: ReturnType<ButtonStyle> = {...outlinedRectangularButtonStyle};

    buttonStyle.Root = {
        ...outlinedRectangularButtonStyle.Root,
        flexDirection: "column",
        minWidth: "auto",
        width: 70,
        height: 60,
        padding: 0,
        borderWidth: 3,
        borderStyle: "solid",
        borderColor: Color.Transparent,
        margin: 5,
        ...isSelectedMonth && {
            borderColor: Color.Neutral
        },
        ...buttonState.hovered && {
            borderColor: Color.Primary,
            backgroundColor: Color.Primary__a10
        },
        ...buttonState.pressed && {
            borderColor: Color.Primary,
            backgroundColor: Color.Primary
        }
    };

    buttonStyle.Icon = Calendar__MonthView__GridCell__Icon;
    buttonStyle.Label = Calendar__MonthView__GridCell__Label;

    return buttonStyle;
};

const Calendar__MonthView: MonthView.Style = function ()
{
    const monthViewStyle: ReturnType<MonthView.Style> = {};

    monthViewStyle.Root = {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between"
    };

    monthViewStyle.GridCell = Calendar__MonthView__GridCell;

    return monthViewStyle;
};

const Calendar__YearView__GridCell__Icon: IconStyle = function ()
{
    const iconStyle: ReturnType<IconStyle> = {};

    iconStyle.Root = {
        display: "none"
    };

    return iconStyle;
};

const Calendar__YearView__GridCell__Label: LabelStyle = function (labelProps)
{
    const yearContext = YearView.ContextHook.useYearContext();
    const buttonContext = ButtonContextHook.useButtonContext();
    const yearViewContext = YearView.ContextHook.useYearViewContext();

    const isSelectedYear = yearContext.value === yearViewContext.props.selectedYear;

    const defaultLabelStyle = LabelVariant.Default(labelProps);
    const labelStyle: ReturnType<LabelStyle> = {...defaultLabelStyle};

    labelStyle.Root = {
        ...defaultLabelStyle.Root,
        fontSize: 14,
        fontWeight: isSelectedYear ? "bold" : "normal",
        color: buttonContext.state.pressed
            ? Color.Ambient
            : buttonContext.state.hovered
                ? Color.White
                : yearContext.isExtraneous
                    ? Color.White__a10
                    : Color.Neutral
    };

    return labelStyle;
};

const Calendar__YearView__GridCell: ButtonStyle = function (buttonProps, buttonState)
{
    const yearContext = YearView.ContextHook.useYearContext();
    const yearViewContext = YearView.ContextHook.useYearViewContext();

    const isSelectedYear = yearContext.value === yearViewContext.props.selectedYear;

    const outlinedRectangularButtonStyle = ButtonVariant.OutlinedRectangular(buttonProps, buttonState);
    const buttonStyle: ReturnType<ButtonStyle> = {...outlinedRectangularButtonStyle};

    buttonStyle.Root = {
        ...outlinedRectangularButtonStyle.Root,
        flexDirection: "column",
        minWidth: "auto",
        width: 70,
        height: 60,
        padding: 0,
        borderWidth: 3,
        borderStyle: "solid",
        borderColor: Color.Transparent,
        margin: 5,
        ...isSelectedYear && {
            borderColor: Color.Neutral
        },
        ...buttonState.hovered && {
            borderColor: Color.Primary,
            backgroundColor: Color.Primary__a10
        },
        ...buttonState.pressed && {
            borderColor: Color.Primary,
            backgroundColor: Color.Primary
        }
    };

    buttonStyle.Icon = Calendar__YearView__GridCell__Icon;
    buttonStyle.Label = Calendar__YearView__GridCell__Label;

    return buttonStyle;
};

const Calendar__YearView: YearView.Style = function ()
{
    const yearViewStyle: ReturnType<YearView.Style> = {};

    yearViewStyle.Root = {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between"
    };

    yearViewStyle.GridCell = Calendar__YearView__GridCell;

    return yearViewStyle;
};

const Calendar__Control__Button__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedIconStyle = ButtonVariant.OutlinedRectangular(buttonContext.props, buttonContext.state).Icon(iconProps);
    const iconStyle: ReturnType<IconStyle> = {...inheritedIconStyle};

    iconStyle.Root = {
        ...inheritedIconStyle.Root,
        minWidth: 12,
        height: 12,
        fontSize: 12,
        fontWeight: "bold",
        color: buttonContext.state.pressed
            ? Color.Gray
            : buttonContext.state.hovered
                ? Color.Gainsboro
                : Color.Neutral
    };

    return iconStyle;
};

const Calendar__Control__Button__Label: LabelStyle = function (labelProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedLabelStyle = ButtonVariant.OutlinedRectangular(buttonContext.props, buttonContext.state).Label(labelProps);
    const labelStyle: ReturnType<LabelStyle> = {...inheritedLabelStyle};

    labelStyle.Root = {
        ...inheritedLabelStyle.Root,
        paddingHorizontal: 0,
        marginLeft: 5,
        fontSize: 12,
        fontWeight: "bold",
        color: buttonContext.state.pressed
            ? Color.Gray
            : buttonContext.state.hovered
                ? Color.Gainsboro
                : Color.Neutral
    };

    return labelStyle;
};

const Calendar__Control__Button: ButtonStyle = function (buttonProps, buttonState)
{
    const outlinedRectangularButtonStyle = ButtonVariant.OutlinedRectangular(buttonProps, buttonState);
    const buttonStyle: ReturnType<ButtonStyle> = {...outlinedRectangularButtonStyle};

    buttonStyle.Root = {
        ...outlinedRectangularButtonStyle.Root,
        minWidth: 80,
        width: 80,
        padding: 0,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: Color.Transparent,
        backgroundColor: Color.Transparent
    };

    buttonStyle.Icon = Calendar__Control__Button__Icon;
    buttonStyle.Label = Calendar__Control__Button__Label;

    return buttonStyle;
};

const Calendar__Control: Control.Style = function ()
{
    const controlStyle: ReturnType<Control.Style> = {};

    controlStyle.Root = {
        flexDirection: "row",
        justifyContent: "space-around"
    };

    controlStyle.Button = Calendar__Control__Button;

    return controlStyle;
};

export const Default: CalendarStyle = function ()
{
    const calendarStyle: ReturnType<CalendarStyle> = {};

    calendarStyle.Root = {
        width: 320
    };

    calendarStyle.Header = Calendar__Header;
    calendarStyle.ViewTransition = Calendar__ViewTransition;
    calendarStyle.DateView = Calendar__DateView;
    calendarStyle.MonthView = Calendar__MonthView;
    calendarStyle.YearView = Calendar__YearView;
    calendarStyle.Control = Calendar__Control;

    return calendarStyle;
};
