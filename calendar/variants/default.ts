import {ButtonContextHook, ButtonStyle, ButtonVariant} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {GregorianCalendar} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";
import {PressableContextHook, PressableStyle, PressableVariant} from "@miniskylab/antimatter-pressable";
import {TransitionStyle, TransitionVariant} from "@miniskylab/antimatter-transition";
import {ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import {Control, DateView, Header, MonthView, YearView} from "../components";
import {CalendarContextHook} from "../hooks";
import {CalendarStyle} from "../models";

const Calendar__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        alignItems: "stretch",
        width: 320
    };
};

const Calendar__Header__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row"
    };
};

const Calendar__Header__Navigator__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.OutlinedCircular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 3,
        borderStyle: "solid",
        userSelect: "none",
        ...pressableState.pressed
            ? {
                borderColor: Color.Primary,
                backgroundColor: Color.Primary
            }
            : pressableState.hovered
                ? {
                    borderColor: Color.Primary,
                    backgroundColor: Color.Primary__a10
                }
                : {
                    borderColor: Color.Transparent,
                    backgroundColor: Color.Transparent
                }
    };
};

const Calendar__Header__Navigator__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();
    const navigatorDirectionContext = Header.ContextHook.useNavigatorDirectionContext();

    const inheritedStyle = ButtonVariant.OutlinedCircular(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        fontSize: 16,
        color: pressableContext.state.pressed
            ? Color.Ambient
            : pressableContext.state.hovered
                ? Color.White
                : Color.Neutral,
        ...navigatorDirectionContext === "backward" && {paddingRight: 2},
        ...navigatorDirectionContext === "forward" && {paddingLeft: 2}
    };
};

const Calendar__Header__Navigator: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedCircular(buttonProps),
        Root: Calendar__Header__Navigator__Root,
        Icon: Calendar__Header__Navigator__Icon
    };
};

const Calendar__Header__Headline__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        alignSelf: "stretch",
        flexGrow: 1,
        minWidth: "auto",
        height: "auto",
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        borderWidth: 0,
        backgroundColor: Color.Transparent,
        ...pressableProps.disabled && {
            opacity: 1,
            cursor: "default"
        }
    };
};

const Calendar__Header__Headline__Label: LabelStyle = function (labelProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Label(labelProps);

    return {
        ...inheritedStyle,
        fontSize: 16,
        fontWeight: "bold",
        color: pressableContext.state.pressed
            ? Color.Neutral
            : pressableContext.state.hovered
                ? Color.White
                : Color.Gainsboro
    };
};

const Calendar__Header__Headline: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedRectangular(buttonProps),
        Root: Calendar__Header__Headline__Root,
        Label: Calendar__Header__Headline__Label
    };
};

const Calendar__Header: Header.Style = function ()
{
    return {
        Root: Calendar__Header__Root,
        Navigator: Calendar__Header__Navigator,
        Headline: Calendar__Header__Headline
    };
};

const Calendar__ViewTransition: TransitionStyle = function (transitionProps, transitionState)
{
    return function (viewProps)
    {
        return {
            ...TransitionVariant.Default(transitionProps, transitionState)(viewProps),
            height: 280
        };
    };
};

const Calendar__DateView__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexWrap: "wrap",
        flexDirection: "row",
        position: "absolute"
    };
};

const Calendar__DateView__WeekNo: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        width: 40,
        height: 40,
        color: Color.White__a10,
        fontSize: 13,
        fontWeight: "bold"
    };
};

const Calendar__DateView__WeekOfYear: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        width: 40,
        height: 40,
        color: Color.White__a10,
        fontSize: 10,
        fontWeight: "bold"
    };
};

const Calendar__DateView__DayOfWeek: LabelStyle = function (labelProps)
{
    return {
        ...LabelVariant.Default(labelProps),
        flexDirection: "column",
        width: 40,
        height: 40,
        color: Color.Gainsboro,
        fontSize: 14,
        fontWeight: "bold"
    };
};

const Calendar__DateView__DateContainer: PressableStyle = function (pressableProps, pressableState)
{
    const dateContext = DateView.ContextHook.useDateContext();
    const calendarContext = CalendarContextHook.useCalendarContext();
    const dateViewContext = DateView.ContextHook.useDateViewContext();

    const isToday = GregorianCalendar.isEqualDate(dateContext.value, dateViewContext.props.today);
    const isSelectedDate = GregorianCalendar.isEqualDate(dateContext.value, calendarContext.props.selectedDate);

    return {
        ...PressableVariant.Default(pressableProps, pressableState),
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
        ...pressableState.hovered && {
            borderColor: Color.Primary,
            backgroundColor: Color.Primary__a10
        },
        ...pressableState.pressed && {
            borderColor: Color.Primary,
            backgroundColor: Color.Primary
        },
        ...isSelectedDate && {
            borderColor: Color.Primary,
            backgroundColor: Color.Primary
        }
    };
};

const Calendar__DateView__DateNumber: LabelStyle = function (labelProps)
{
    const dateContext = DateView.ContextHook.useDateContext();
    const calendarContext = CalendarContextHook.useCalendarContext();
    const dateViewContext = DateView.ContextHook.useDateViewContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const isToday = GregorianCalendar.isEqualDate(dateContext.value, dateViewContext.props.today);
    const isSelectedDate = GregorianCalendar.isEqualDate(dateContext.value, calendarContext.props.selectedDate);

    return {
        ...LabelVariant.Default(labelProps),
        fontSize: 12,
        fontWeight: pressableContext.state.pressed || isSelectedDate ? "bold" : "normal",
        color: pressableContext.state.pressed || isSelectedDate
            ? Color.Ambient
            : pressableContext.state.hovered
                ? Color.White
                : dateContext.isExtraneous
                    ? Color.White__a10
                    : Color.Neutral,
        ...isToday && {
            fontSize: 11
        }
    };
};

const Calendar__DateView__TodayText: LabelStyle = function (labelProps)
{
    const dateContext = DateView.ContextHook.useDateContext();
    const calendarContext = CalendarContextHook.useCalendarContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const isSelectedDate = GregorianCalendar.isEqualDate(dateContext.value, calendarContext.props.selectedDate);

    return {
        ...LabelVariant.Default(labelProps),
        flexDirection: "column",
        height: 15,
        marginTop: 3,
        marginBottom: -2,
        fontSize: 10,
        fontWeight: pressableContext.state.pressed || isSelectedDate ? "bold" : "normal",
        color: pressableContext.state.pressed || isSelectedDate
            ? Color.Ambient
            : pressableContext.state.hovered
                ? Color.White
                : dateContext.isExtraneous
                    ? Color.White__a10
                    : Color.Neutral
    };
};

const Calendar__DateView: DateView.Style = function ()
{
    return {
        Root: Calendar__DateView__Root,
        WeekNo: Calendar__DateView__WeekNo,
        WeekOfYear: Calendar__DateView__WeekOfYear,
        DayOfWeek: Calendar__DateView__DayOfWeek,
        DateContainer: Calendar__DateView__DateContainer,
        DateNumber: Calendar__DateView__DateNumber,
        TodayText: Calendar__DateView__TodayText
    };
};

const Calendar__MonthView__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between"
    };
};

const Calendar__MonthView__GridCell__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const monthContext = MonthView.ContextHook.useMonthContext();
    const monthViewContext = MonthView.ContextHook.useMonthViewContext();

    const isSelectedMonth = GregorianCalendar.isEqualMonth(monthContext.value, monthViewContext.props.selectedMonth);

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        flexDirection: "column",
        minWidth: "auto",
        width: 70,
        height: 60,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        borderWidth: 3,
        borderStyle: "solid",
        borderColor: Color.Transparent,
        margin: 5,
        ...isSelectedMonth && {
            borderColor: Color.Neutral
        },
        ...pressableState.hovered && {
            borderColor: Color.Primary,
            backgroundColor: Color.Primary__a10
        },
        ...pressableState.pressed && {
            borderColor: Color.Primary,
            backgroundColor: Color.Primary
        }
    };
};

const Calendar__MonthView__GridCell__Icon: IconStyle = function ()
{
    return {
        display: "none"
    };
};

const Calendar__MonthView__GridCell__Label: LabelStyle = function (labelProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const monthContext = MonthView.ContextHook.useMonthContext();
    const monthViewContext = MonthView.ContextHook.useMonthViewContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const isSelectedMonth = GregorianCalendar.isEqualMonth(monthContext.value, monthViewContext.props.selectedMonth);

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Label(labelProps);

    return {
        ...inheritedStyle,
        fontSize: 14,
        fontWeight: isSelectedMonth ? "bold" : "normal",
        color: pressableContext.state.pressed
            ? Color.Ambient
            : pressableContext.state.hovered
                ? Color.White
                : monthContext.isExtraneous
                    ? Color.White__a10
                    : Color.Neutral
    };
};

const Calendar__MonthView__GridCell: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedRectangular(buttonProps),
        Root: Calendar__MonthView__GridCell__Root,
        Icon: Calendar__MonthView__GridCell__Icon,
        Label: Calendar__MonthView__GridCell__Label
    };
};

const Calendar__MonthView: MonthView.Style = function ()
{
    return {
        Root: Calendar__MonthView__Root,
        GridCell: Calendar__MonthView__GridCell
    };
};

const Calendar__YearView__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between"
    };
};

const Calendar__YearView__GridCell__Root: PressableStyle = function (pressableProps, pressableState)
{
    const yearContext = YearView.ContextHook.useYearContext();
    const buttonContext = ButtonContextHook.useButtonContext();
    const yearViewContext = YearView.ContextHook.useYearViewContext();

    const isSelectedYear = yearContext.value === yearViewContext.props.selectedYear;

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        flexDirection: "column",
        minWidth: "auto",
        width: 70,
        height: 60,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        borderWidth: 3,
        borderStyle: "solid",
        borderColor: Color.Transparent,
        margin: 5,
        ...isSelectedYear && {
            borderColor: Color.Neutral
        },
        ...pressableState.hovered && {
            borderColor: Color.Primary,
            backgroundColor: Color.Primary__a10
        },
        ...pressableState.pressed && {
            borderColor: Color.Primary,
            backgroundColor: Color.Primary
        }
    };
};

const Calendar__YearView__GridCell__Icon: IconStyle = function ()
{
    return {
        display: "none"
    };
};

const Calendar__YearView__GridCell__Label: LabelStyle = function (labelProps)
{
    const yearContext = YearView.ContextHook.useYearContext();
    const buttonContext = ButtonContextHook.useButtonContext();
    const yearViewContext = YearView.ContextHook.useYearViewContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const isSelectedYear = yearContext.value === yearViewContext.props.selectedYear;

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Label(labelProps);

    return {
        ...inheritedStyle,
        paddingHorizontal: 0,
        fontSize: 14,
        fontWeight: isSelectedYear ? "bold" : "normal",
        color: pressableContext.state.pressed
            ? Color.Ambient
            : pressableContext.state.hovered
                ? Color.White
                : yearContext.isExtraneous
                    ? Color.White__a10
                    : Color.Neutral
    };
};

const Calendar__YearView__GridCell: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedRectangular(buttonProps),
        Root: Calendar__YearView__GridCell__Root,
        Icon: Calendar__YearView__GridCell__Icon,
        Label: Calendar__YearView__GridCell__Label
    };
};

const Calendar__YearView: YearView.Style = function ()
{
    return {
        Root: Calendar__YearView__Root,
        GridCell: Calendar__YearView__GridCell
    };
};

const Calendar__Control__Root: ViewStyle = function (viewProps)
{
    return {
        ...ViewVariant.Default(viewProps),
        flexDirection: "row",
        justifyContent: "space-around"
    };
};

const Calendar__Control__Button__Root: PressableStyle = function (pressableProps, pressableState)
{
    const buttonContext = ButtonContextHook.useButtonContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Root(pressableProps, pressableState);

    return {
        ...inheritedStyle,
        minWidth: 80,
        width: 80,
        padding: 0,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: Color.Transparent,
        backgroundColor: Color.Transparent
    };
};

const Calendar__Control__Button__Icon: IconStyle = function (iconProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Icon(iconProps);

    return {
        ...inheritedStyle,
        minWidth: 12,
        height: 12,
        fontSize: 12,
        fontWeight: "bold",
        color: pressableContext.state.pressed
            ? Color.Gray
            : pressableContext.state.hovered
                ? Color.Gainsboro
                : Color.Neutral
    };
};

const Calendar__Control__Button__Label: LabelStyle = function (labelProps)
{
    const buttonContext = ButtonContextHook.useButtonContext();
    const pressableContext = PressableContextHook.usePressableContext();

    const inheritedStyle = ButtonVariant.OutlinedRectangular(buttonContext.props).Label(labelProps);

    return {
        ...inheritedStyle,
        paddingHorizontal: 0,
        marginLeft: 5,
        fontSize: 12,
        fontWeight: "bold",
        color: pressableContext.state.pressed
            ? Color.Gray
            : pressableContext.state.hovered
                ? Color.Gainsboro
                : Color.Neutral
    };
};

const Calendar__Control__Button: ButtonStyle = function (buttonProps)
{
    return {
        ...ButtonVariant.OutlinedRectangular(buttonProps),
        Root: Calendar__Control__Button__Root,
        Icon: Calendar__Control__Button__Icon,
        Label: Calendar__Control__Button__Label
    };
};

const Calendar__Control: Control.Style = function ()
{
    return {
        Root: Calendar__Control__Root,
        Button: Calendar__Control__Button
    };
};

export const Default: CalendarStyle = function ()
{
    return {
        Root: Calendar__Root,
        Header: Calendar__Header,
        ViewTransition: Calendar__ViewTransition,
        DateView: Calendar__DateView,
        MonthView: Calendar__MonthView,
        YearView: Calendar__YearView,
        Control: Calendar__Control
    };
};
