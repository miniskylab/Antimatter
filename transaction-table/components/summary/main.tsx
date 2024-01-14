import {AllPropertiesMustPresent, EMPTY_STRING, Style, Ts} from "@miniskylab/antimatter-framework";
import {Label} from "@miniskylab/antimatter-label";
import {RangeSlider} from "@miniskylab/antimatter-range-slider";
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
    progressBarValue
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, section1Label, section1Value, section2Label, section2Value, progressBarValue
    };

    const context = useMemo<SummaryContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const computedStyle = Style.useComputedStyle(style, props);

    return (
        <SummaryContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <SectionContext.Provider value={"section-1"}>
                    <View style={computedStyle.Section}>
                        <Label style={computedStyle.Label}>{section1Label}</Label>
                        <Label style={computedStyle.Amount}>{section1Value}</Label>
                    </View>
                </SectionContext.Provider>
                <SectionContext.Provider value={"section-2"}>
                    <View style={computedStyle.Section}>
                        <Label style={computedStyle.Label}>{section2Label}</Label>
                        <Label style={computedStyle.Amount}>{section2Value}</Label>
                    </View>
                </SectionContext.Provider>
                {!Ts.Object.isNullOrUndefined(progressBarValue) && (
                    <RangeSlider
                        style={computedStyle.RangeSlider}
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
