import {Button} from "@miniskylab/antimatter-button";
import {Calendar} from "@miniskylab/antimatter-calendar";
import {DateFormat, GregorianCalendar} from "@miniskylab/antimatter-framework";
import {IconName} from "@miniskylab/antimatter-icon";
import {InputField} from "@miniskylab/antimatter-input-field";
import {View} from "@miniskylab/antimatter-view";
import React, {useMemo} from "react";
import {DatePickerContext, DatePickerProps} from "./model";
import * as Variant from "./variant";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function DatePicker({
    style = Variant.Default,
    selectedDate,
    placeholder,
    calendarIsOpen = false,
    focusable = false,
    autoFocus = false,
    editable = false,
    onAddonPress,
    onSelectedDateChange
}: DatePickerProps): JSX.Element
{
    const props: Required<DatePickerProps> = {
        style, selectedDate, placeholder, calendarIsOpen, focusable, autoFocus, editable, onAddonPress, onSelectedDateChange
    };

    const context = useMemo<DatePickerContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    return (
        <DatePickerContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <InputField
                    style={computedStyle.InputField}
                    value={GregorianCalendar.toString(selectedDate, DateFormat.Short)}
                    placeholder={!selectedDate && placeholder}
                    focusable={focusable}
                    autoFocus={autoFocus}
                    editable={editable}
                />
                <Button
                    style={computedStyle.Addon}
                    icon={IconName.Calendar}
                    onPress={onAddonPress}
                />
                {calendarIsOpen && (
                    <>
                        <View style={computedStyle.Caret} pointerEvents={"none"}/>
                        <Calendar
                            style={computedStyle.Calendar}
                            selectedDate={selectedDate}
                            onSelectedDateChange={newlySelectedDate => { onSelectedDateChange?.(newlySelectedDate); }}
                        />
                    </>
                )}
            </View>
        </DatePickerContext.Provider>
    );
}
