import {Button} from "@miniskylab/antimatter-button";
import {type AllPropertiesMustPresent, EMPTY_STRING, GregorianCalendar, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {Props, YearContext, YearViewContext} from "./models";

export function Component({
    style,
    selectedYear,
    data,
    onYearPress
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, selectedYear, data, onYearPress
    };

    const context = useMemo<YearViewContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <YearViewContext.Provider value={context}>
            <View style={computedStyle.Root}>
                {data?.map(yearInfo =>
                {
                    const outOfSupportedYearRange = yearInfo.value < GregorianCalendar.MIN_YEAR
                                                    ||
                                                    yearInfo.value > GregorianCalendar.MAX_YEAR;

                    return (
                        <YearContext.Provider key={yearInfo.value} value={useMemo(() => yearInfo, [...Object.values(yearInfo)])}>
                            <Button
                                style={computedStyle.GridCell}
                                disabled={outOfSupportedYearRange}
                                label={outOfSupportedYearRange ? EMPTY_STRING : yearInfo.value.toString()}
                                onPress={outOfSupportedYearRange ? undefined : () => { onYearPress?.(yearInfo.value); }}
                            />
                        </YearContext.Provider>
                    );
                })}
            </View>
        </YearViewContext.Provider>
    );
}
