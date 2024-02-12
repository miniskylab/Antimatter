import {AllPropertiesMustPresent, EMPTY_STRING, isNotNullAndUndefined, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {Label} from "@miniskylab/antimatter-label";
import {RangeSlider} from "@miniskylab/antimatter-range-slider";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {Props, SectionContext, SummaryContext} from "./models";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
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
                <SectionContext.Provider value={"section-1"}>
                    <View style={computedStyle.Section}>
                        <Label style={computedStyle.SectionLabel}>{section1Label}</Label>
                        <Label style={computedStyle.SectionAmount}>{section1Value}</Label>
                    </View>
                </SectionContext.Provider>
                {indicator && (
                    <SectionContext.Provider value={"indicator"}>
                        <View style={computedStyle.Indicator}>
                            <Icon style={computedStyle.IndicatorIcon} name={indicator.icon ?? DefaultIconSet.None}/>
                            <Label style={computedStyle.IndicatorLabel}>{indicator.label}</Label>
                        </View>
                    </SectionContext.Provider>
                )}
                <SectionContext.Provider value={"section-2"}>
                    <View style={computedStyle.Section}>
                        <Label style={computedStyle.SectionLabel}>{section2Label}</Label>
                        <Label style={computedStyle.SectionAmount}>{section2Value}</Label>
                    </View>
                </SectionContext.Provider>
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
