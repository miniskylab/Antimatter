import {Button} from "@miniskylab/antimatter-button";
import {AllPropertiesMustPresent, GregorianCalendar, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {MonthContext, MonthViewContext, Props} from "./models";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    style,
    selectedMonth,
    data,
    onMonthPress
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, selectedMonth, data, onMonthPress
    };

    const context = useMemo<MonthViewContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const computedStyle = useComputedStyle(style, props);

    return (
        <MonthViewContext.Provider value={context}>
            <View style={computedStyle.Root}>
                {data?.map(monthInfo => (
                    <MonthContext.Provider
                        key={`${monthInfo.value.getMonth()}${monthInfo.value.getFullYear()}`}
                        value={useMemo(() => monthInfo, [monthInfo.value.getTime(), monthInfo.isExtraneous])}
                    >
                        <Button
                            style={computedStyle.GridCell}
                            label={GregorianCalendar.getShortMonthName(monthInfo.value.getMonth())}
                            onPress={() => { onMonthPress?.(new Date(monthInfo.value)); }}
                        />
                    </MonthContext.Provider>
                ))}
            </View>
        </MonthViewContext.Provider>
    );
}
