import {EMPTY_STRING, Style, Ts} from "@miniskylab/antimatter-framework";
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
    section1Amount = 0,
    section2Label = EMPTY_STRING,
    section2Amount = 0,
    progressBarValue
}: Props): JSX.Element
{
    const props: Required<Props> = {
        style, section1Label, section1Amount, section2Label, section2Amount, progressBarValue
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
                        <Label style={computedStyle.Amount}>{section1Amount.toLocaleString("en-us")}</Label>
                    </View>
                </SectionContext.Provider>
                <SectionContext.Provider value={"section-2"}>
                    <View style={computedStyle.Section}>
                        <Label style={computedStyle.Label}>{section2Label}</Label>
                        <Label style={computedStyle.Amount}>{section2Amount.toLocaleString("en-us")}</Label>
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
