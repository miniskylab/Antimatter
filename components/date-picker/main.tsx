import {Button} from "@miniskylab/antimatter-button";
import {Calendar} from "@miniskylab/antimatter-calendar";
import {
    type AllPropertiesMustPresent,
    DateFormat,
    EMPTY_STRING,
    GregorianCalendar,
    Ts,
    useComponentContext,
    useComputedStyle
} from "@miniskylab/antimatter-framework";
import {InputField} from "@miniskylab/antimatter-input-field";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX} from "react";
import {DatePickerContext, DatePickerProps} from "./models";
import * as Variant from "./variants";

/**
 * A component that allows users to input date.
 */
export function DatePicker({
    style = Variant.Default,
    selectedDate,
    placeholder = EMPTY_STRING,
    dateFormat = DateFormat.Short,
    isCalendarOpen = false,
    focusable = false,
    autoFocus = false,
    editable = false,
    onAddonPress,
    onSelectedDateChange
}: DatePickerProps): JSX.Element
{
    const props: AllPropertiesMustPresent<DatePickerProps> = {
        style, selectedDate, placeholder, dateFormat, isCalendarOpen, focusable, autoFocus, editable, onAddonPress, onSelectedDateChange
    };

    const context = useComponentContext<DatePickerContext>({props});

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <DatePickerContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <InputField
                    style={computedStyle.InputField}
                    value={selectedDate ? GregorianCalendar.toString(selectedDate, dateFormat).replaceAll("/", " / ") : undefined}
                    placeholder={selectedDate ? undefined : placeholder}
                    focusable={focusable}
                    autoFocus={autoFocus}
                    editable={editable}
                />
                <Button
                    style={computedStyle.Addon}
                    icon={DefaultIconSet.Calendar}
                    onPress={onAddonPress}
                />
                {isCalendarOpen && (
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
