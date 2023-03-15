import {ButtonContext, ButtonStyle, ButtonVariant} from "@miniskylab/antimatter-button";
import {Color} from "@miniskylab/antimatter-color-scheme";
import {GregorianCalendar, LunarCalendarVn, throwError} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";
import {useContext} from "react";
import {Control, DateView, Header, MonthView, YearView} from "../components";
import {CalendarStyle, HighlightedDate} from "../model";

export const Default: CalendarStyle = function (calendarProps, calendarState)
{
    const calendarStyle: ReturnType<CalendarStyle> = {};

    calendarStyle.Root = {
        width: 320
    };

    calendarStyle.Header = function ()
    {
        const headerStyle: ReturnType<Header.Style> = {};

        headerStyle.Root = {
            flexDirection: "row"
        };

        headerStyle.Navigator = function (position)
        {
            return function (buttonProps, buttonState)
            {
                const outlinedCircularButtonStyle = ButtonVariant.OutlinedCircular(buttonProps, buttonState);
                const buttonStyle: ReturnType<ButtonStyle> = {...outlinedCircularButtonStyle};

                buttonStyle.Root = {
                    ...outlinedCircularButtonStyle.Root,
                    width: 40,
                    height: 40,
                    borderRadius: 40 / 2,
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

                buttonStyle.Icon = function (iconProps)
                {
                    const inheritedIconStyle = outlinedCircularButtonStyle.Icon(iconProps);
                    const iconStyle: ReturnType<IconStyle> = {...inheritedIconStyle};

                    iconStyle.Root = {
                        ...inheritedIconStyle.Root,
                        fontSize: 16,
                        color: buttonState.pressed
                            ? Color.Ambient
                            : buttonState.hovered
                                ? Color.White
                                : Color.Neutral,
                        ...position === "left" && {paddingRight: 2},
                        ...position === "right" && {paddingLeft: 2}
                    };

                    return iconStyle;
                };

                return buttonStyle;
            };
        };

        headerStyle.Headline = function (buttonProps, buttonState)
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

            buttonStyle.Label = function (labelProps)
            {
                const inheritedLabelStyle = outlinedRectangularButtonStyle.Label(labelProps);
                const labelStyle: ReturnType<LabelStyle> = {...inheritedLabelStyle};

                labelStyle.Root = {
                    ...inheritedLabelStyle.Root,
                    fontSize: 16,
                    fontWeight: "bold",
                    color: buttonState.pressed
                        ? Color.Neutral
                        : buttonState.hovered
                            ? Color.White
                            : Color.Gainsboro
                };

                return labelStyle;
            };

            return buttonStyle;
        };

        return headerStyle;
    };

    calendarStyle.DateView = function ()
    {
        const dateViewStyle: ReturnType<DateView.Style> = {};

        dateViewStyle.Root = {
            flexWrap: "wrap",
            flexDirection: "row"
        };

        dateViewStyle.WeekNo = function (labelProps)
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

        dateViewStyle.WeekOfYear = function (labelProps)
        {
            const weekNoStyle = dateViewStyle.WeekNo(labelProps);
            const labelStyle: ReturnType<LabelStyle> = {...weekNoStyle};

            labelStyle.Root = {
                ...weekNoStyle.Root,
                fontSize: 10
            };

            return labelStyle;
        };

        dateViewStyle.DayOfWeek = function (labelProps)
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

        dateViewStyle.DateContainer = function (date)
        {
            const isHighlightedDate = !!getHighlightedDate(calendarState.today);
            const isToday = GregorianCalendar.isEqualDate(date, calendarState.today);
            const isSelectedDate = GregorianCalendar.isEqualDate(date, calendarProps.selectedDate);
            const isExtraneousDate = !GregorianCalendar.isEqualMonth(date, calendarState.timeFrame.monthAndYear);

            return {
                Container: function (buttonProps, buttonState)
                {
                    const outlinedCircularButtonStyle = ButtonVariant.OutlinedCircular(buttonProps, buttonState);
                    const buttonStyle: ReturnType<ButtonStyle> = {...outlinedCircularButtonStyle};

                    buttonStyle.Root = {
                        ...outlinedCircularButtonStyle.Root,
                        flexDirection: "column",
                        flexWrap: "nowrap",
                        width: 38,
                        height: 38,
                        margin: 1,
                        borderRadius: 38 / 2,
                        borderWidth: 3,
                        borderStyle: "solid",
                        borderColor: isToday
                            ? isExtraneousDate
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
                },
                DateNumber: function (labelProps)
                {
                    const containerContext = useContext(ButtonContext);
                    const defaultLabelStyle = LabelVariant.Default(labelProps);
                    const labelStyle: ReturnType<LabelStyle> = {...defaultLabelStyle};

                    labelStyle.Root = {
                        ...defaultLabelStyle.Root,
                        fontSize: 12,
                        fontWeight: containerContext.pressed || isSelectedDate || isHighlightedDate ? "bold" : "normal",
                        color: containerContext.pressed || isSelectedDate
                            ? Color.Ambient
                            : containerContext.hovered
                                ? Color.White
                                : isExtraneousDate
                                    ? Color.White__a10
                                    : Color.Neutral,
                        ...isToday && {
                            height: 15,
                            paddingTop: 3,
                            fontSize: 11
                        }
                    };

                    return labelStyle;
                },
                TodayText: function (labelProps)
                {
                    const containerContext = useContext(ButtonContext);
                    const defaultLabelStyle = LabelVariant.Default(labelProps);
                    const labelStyle: ReturnType<LabelStyle> = {...defaultLabelStyle};

                    labelStyle.Root = {
                        ...defaultLabelStyle.Root,
                        flexDirection: "column",
                        height: 9,
                        paddingTop: 4,
                        fontSize: 10,
                        fontWeight: containerContext.pressed || isSelectedDate || isHighlightedDate ? "bold" : "normal",
                        color: containerContext.pressed || isSelectedDate
                            ? Color.Ambient
                            : containerContext.hovered
                                ? Color.White
                                : isExtraneousDate
                                    ? Color.White__a10
                                    : Color.Neutral
                    };

                    return labelStyle;
                }
            };

            function getHighlightedDate(date: Date): HighlightedDate
            {
                for (const highlightedDate of calendarProps.highlightedDates)
                {
                    let _date = highlightedDate.day;
                    let month = highlightedDate.month;
                    let year = highlightedDate.year;
                    if (highlightedDate.useLunarCalendar)
                    {
                        const lunarYear = LunarCalendarVn.getLunarDate(date)[0];
                        const gregorianDate = LunarCalendarVn.getGregorianDate(year || lunarYear, month + 1, _date);
                        if (!gregorianDate)
                        {
                            return null;
                        }

                        _date = gregorianDate.getDate();
                        month = gregorianDate.getMonth();
                        year = year && gregorianDate.getFullYear();
                    }

                    const matchDate = _date === date.getDate();
                    const matchMonth = month !== undefined && month !== null ? month === date.getMonth() : true;
                    const matchYear = year ? year === date.getFullYear() : true;
                    if (matchDate && matchMonth && matchYear)
                    {
                        return highlightedDate;
                    }
                }

                return null;
            }
        };

        return dateViewStyle;
    };

    calendarStyle.MonthView = function (monthViewProps)
    {
        const monthViewStyle: ReturnType<MonthView.Style> = {};

        monthViewStyle.Root = {
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-between"
        };

        monthViewStyle.GridCell = function (month)
        {
            const isExtraneousMonth = month.getFullYear() !== monthViewProps.displayingYear;
            const isSelectedMonth = GregorianCalendar.isEqualMonth(month, monthViewProps.selectedMonth);

            return function (buttonProps, buttonState)
            {
                const outlinedRectangularButtonStyle = ButtonVariant.OutlinedRectangular(buttonProps, buttonState);
                const buttonStyle: ReturnType<ButtonStyle> = {...outlinedRectangularButtonStyle};

                buttonStyle.Root = {
                    ...outlinedRectangularButtonStyle.Root,
                    flexDirection: "column",
                    minWidth: "auto",
                    width: typeof (calendarStyle.Root.width) === "number"
                        ? calendarStyle.Root.width * 0.25 - 10
                        : throwError("Calendar's width must be a number."),
                    height: 60,
                    padding: 0,
                    borderWidth: 3,
                    borderStyle: "solid",
                    borderColor: Color.Transparent,
                    margin: 5,
                    ...buttonState.hovered && {
                        borderColor: Color.Primary,
                        backgroundColor: Color.Primary__a10
                    },
                    ...buttonState.pressed && {
                        borderColor: Color.Primary,
                        backgroundColor: Color.Primary
                    },
                    ...isSelectedMonth && {
                        borderColor: Color.Neutral
                    }
                };

                buttonStyle.Icon = function ()
                {
                    const iconStyle: ReturnType<IconStyle> = {};

                    iconStyle.Root = {
                        display: "none"
                    };

                    return iconStyle;
                };

                buttonStyle.Label = function (labelProps)
                {
                    const defaultLabelStyle = LabelVariant.Default(labelProps);
                    const labelStyle: ReturnType<LabelStyle> = {...defaultLabelStyle};

                    labelStyle.Root = {
                        ...defaultLabelStyle.Root,
                        fontSize: 14,
                        fontWeight: isSelectedMonth ? "bold" : "normal",
                        color: buttonState.pressed
                            ? Color.Ambient
                            : buttonState.hovered
                                ? Color.White
                                : isExtraneousMonth
                                    ? Color.White__a10
                                    : Color.Neutral
                    };

                    return labelStyle;
                };

                return buttonStyle;
            };
        };

        return monthViewStyle;
    };

    calendarStyle.YearView = function (yearViewProps)
    {
        const yearViewStyle: ReturnType<YearView.Style> = {};

        yearViewStyle.Root = {
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-between"
        };

        yearViewStyle.GridCell = function (year, nextDecade)
        {
            const isExtraneousYear = year < yearViewProps.displayingDecade || nextDecade <= year;
            const isSelectedYear = year === yearViewProps.selectedYear;

            return function (buttonProps, buttonState)
            {
                const outlinedRectangularButtonStyle = ButtonVariant.OutlinedRectangular(buttonProps, buttonState);
                const buttonStyle: ReturnType<ButtonStyle> = {...outlinedRectangularButtonStyle};

                buttonStyle.Root = {
                    ...outlinedRectangularButtonStyle.Root,
                    flexDirection: "column",
                    minWidth: "auto",
                    width: typeof (calendarStyle.Root.width) === "number"
                        ? calendarStyle.Root.width * 0.25 - 10
                        : throwError("Calendar's width must be a number."),
                    height: 60,
                    padding: 0,
                    borderWidth: 3,
                    borderStyle: "solid",
                    borderColor: Color.Transparent,
                    margin: 5,
                    ...buttonState.hovered && {
                        borderColor: Color.Primary,
                        backgroundColor: Color.Primary__a10
                    },
                    ...buttonState.pressed && {
                        borderColor: Color.Primary,
                        backgroundColor: Color.Primary
                    },
                    ...isSelectedYear && {
                        borderColor: Color.Neutral
                    }
                };

                buttonStyle.Icon = function ()
                {
                    const iconStyle: ReturnType<IconStyle> = {};

                    iconStyle.Root = {
                        display: "none"
                    };

                    return iconStyle;
                };

                buttonStyle.Label = function (labelProps)
                {
                    const defaultLabelStyle = LabelVariant.Default(labelProps);
                    const labelStyle: ReturnType<LabelStyle> = {...defaultLabelStyle};

                    labelStyle.Root = {
                        ...defaultLabelStyle.Root,
                        fontSize: 14,
                        fontWeight: isSelectedYear ? "bold" : "normal",
                        color: buttonState.pressed
                            ? Color.Ambient
                            : buttonState.hovered
                                ? Color.White
                                : isExtraneousYear
                                    ? Color.White__a10
                                    : Color.Neutral
                    };

                    return labelStyle;
                };

                return buttonStyle;
            };
        };

        return yearViewStyle;
    };

    calendarStyle.Control = function ()
    {
        const controlStyle: ReturnType<Control.Style> = {};

        controlStyle.Root = {
            flexDirection: "row",
            justifyContent: "space-around"
        };

        controlStyle.Button = function (buttonProps, buttonState)
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

            buttonStyle.Icon = function (iconProps)
            {
                const inheritedIconStyle = outlinedRectangularButtonStyle.Icon(iconProps);
                const iconStyle: ReturnType<IconStyle> = {...inheritedIconStyle};

                iconStyle.Root = {
                    ...inheritedIconStyle.Root,
                    minWidth: 12,
                    height: 12,
                    fontSize: 12,
                    fontWeight: "bold",
                    color: buttonState.pressed
                        ? Color.Gray
                        : buttonState.hovered
                            ? Color.Gainsboro
                            : Color.Neutral
                };

                return iconStyle;
            };

            buttonStyle.Label = function (labelProps)
            {
                const inheritedLabelStyle = outlinedRectangularButtonStyle.Label(labelProps);
                const labelStyle: ReturnType<LabelStyle> = {...inheritedLabelStyle};

                labelStyle.Root = {
                    ...inheritedLabelStyle.Root,
                    paddingHorizontal: 0,
                    marginLeft: 5,
                    fontSize: 12,
                    fontWeight: "bold",
                    color: buttonState.pressed
                        ? Color.Gray
                        : buttonState.hovered
                            ? Color.Gainsboro
                            : Color.Neutral
                };

                return labelStyle;
            };

            return buttonStyle;
        };

        return controlStyle;
    };

    return calendarStyle;
};
