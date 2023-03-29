import {Button} from "@miniskylab/antimatter-button";
import {GregorianCalendar} from "@miniskylab/antimatter-framework";
import React, {useMemo} from "react";
import {Animated} from "react-native";
import {MonthContext, MonthViewContext, Props} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    id,
    style,
    onReadyToUnmount,
    selectedMonth,
    data,
    onMonthClick
}: Props): JSX.Element
{
    const props: Required<Props> = {
        id, style, onReadyToUnmount, selectedMonth, data, onMonthClick
    };

    const context = useMemo<MonthViewContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    return (
        <MonthViewContext.Provider value={context}>
            <Animated.View style={computedStyle.Root}>
                {data.map(monthInfo => (
                    <MonthContext.Provider
                        key={`${monthInfo.value.getMonth()}${monthInfo.value.getFullYear()}`}
                        value={useMemo(() => monthInfo, [monthInfo.value.getTime(), monthInfo.isExtraneous])}
                    >
                        <Button
                            style={computedStyle.GridCell}
                            label={GregorianCalendar.getShortMonthName(monthInfo.value.getMonth())}
                            onClick={() => { onMonthClick(new Date(monthInfo.value)); }}
                        />
                    </MonthContext.Provider>
                ))}
            </Animated.View>
        </MonthViewContext.Provider>
    );
}
