import {Button} from "@miniskylab/antimatter-button";
import {EMPTY_STRING, GregorianCalendar} from "@miniskylab/antimatter-framework";
import React, {useMemo} from "react";
import {Animated} from "react-native";
import {Props, YearContext, YearViewContext} from "./model";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    style,
    selectedYear,
    data,
    onYearClick
}: Props): JSX.Element
{
    const props: Required<Props> = {
        style, selectedYear, data, onYearClick
    };

    const context = useMemo<YearViewContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const {style: _, ...propsWithoutStyle} = props;
    const computedStyle = style(propsWithoutStyle);

    return (
        <YearViewContext.Provider value={context}>
            <Animated.View style={computedStyle.Root}>
                {data.map(yearInfo =>
                {
                    const outOfSupportedYearRange = yearInfo.value < GregorianCalendar.MIN_YEAR
                                                    ||
                                                    yearInfo.value > GregorianCalendar.MAX_YEAR;

                    return (
                        <YearContext.Provider
                            key={yearInfo.value}
                            value={useMemo(() => yearInfo, [...Object.values(yearInfo)])}
                        >
                            <Button
                                style={computedStyle.GridCell}
                                label={outOfSupportedYearRange ? EMPTY_STRING : yearInfo.value.toString()}
                                onClick={outOfSupportedYearRange ? undefined : () => { onYearClick(yearInfo.value); }}
                                disabled={outOfSupportedYearRange}
                            />
                        </YearContext.Provider>
                    );
                })}
            </Animated.View>
        </YearViewContext.Provider>
    );
}
