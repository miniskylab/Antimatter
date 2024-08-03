import {type AllPropertiesMustPresent, EMPTY_STRING, isNotNullAndUndefined, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {RangeSlider} from "@miniskylab/antimatter-range-slider";
import {Text} from "@miniskylab/antimatter-text";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {Props, SummaryContext} from "./models";

/**
 * A component for displaying the most important information extracted from the transaction table.
 */
export function Component({
    style,
    section1Label = EMPTY_STRING,
    section1Value = EMPTY_STRING,
    section2Label = EMPTY_STRING,
    section2Value = EMPTY_STRING,
    indicator,
    progressBarValue
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, section1Label, section1Value, section2Label, section2Value, indicator, progressBarValue
    };

    const context = useMemo<SummaryContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    return (
        <SummaryContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <View style={computedStyle.Section1}>
                    <Text style={computedStyle.Section1Label}>{section1Label}</Text>
                    <Text style={computedStyle.Section1Amount}>{section1Value}</Text>
                </View>
                {indicator && (
                    <View style={computedStyle.Indicator}>
                        <Icon style={computedStyle.IndicatorIcon} name={indicator.icon ?? DefaultIconSet.None}/>
                        <Text style={computedStyle.IndicatorLabel}>{indicator.label}</Text>
                    </View>
                )}
                <View style={computedStyle.Section2}>
                    <Text style={computedStyle.Section2Label}>{section2Label}</Text>
                    <Text style={computedStyle.Section2Amount}>{section2Value}</Text>
                </View>
                {isNotNullAndUndefined(progressBarValue) && (
                    <RangeSlider
                        style={computedStyle.ProgressBar}
                        minValue={0}
                        maxValue={1}
                        value={Ts.Number.clamp(progressBarValue, 0, 1)}
                        disabled={true}
                    />
                )}
            </View>
        </SummaryContext.Provider>
    );
}
