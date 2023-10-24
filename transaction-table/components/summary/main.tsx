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
    expenseLabel = EMPTY_STRING,
    expenseAmount = 0,
    incomeLabel = EMPTY_STRING,
    incomeAmount = 0
}: Props): JSX.Element
{
    const props: Required<Props> = {
        style, expenseLabel, expenseAmount, incomeLabel, incomeAmount
    };

    const context = useMemo<SummaryContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const computedStyle = Style.useComputedStyle(style, props);
    const summaryPct = getSummaryPct();

    return (
        <SummaryContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <SectionContext.Provider value={"income"}>
                    <View style={computedStyle.Section}>
                        <Label style={computedStyle.Label}>{incomeLabel}</Label>
                        <Label style={computedStyle.Amount}>{incomeAmount.toLocaleString("en-us")}</Label>
                    </View>
                </SectionContext.Provider>
                <SectionContext.Provider value={"expense"}>
                    <View style={computedStyle.Section}>
                        <Label style={computedStyle.Label}>{expenseLabel}</Label>
                        <Label style={computedStyle.Amount}>{expenseAmount.toLocaleString("en-us")}</Label>
                    </View>
                </SectionContext.Provider>
                <RangeSlider
                    style={computedStyle.RangeSlider}
                    minValue={0}
                    maxValue={1}
                    value={summaryPct}
                    disabled={true}
                />
            </View>
        </SummaryContext.Provider>
    );

    function getSummaryPct(): number
    {
        if (incomeAmount === 0 && expenseAmount === 0)
        {
            return 0.5;
        }

        if (incomeAmount === 0)
        {
            return 0;
        }

        if (expenseAmount === 0)
        {
            return 1;
        }

        return Ts.Number.clamp(incomeAmount / (incomeAmount + expenseAmount), 0, 1);
    }
}
