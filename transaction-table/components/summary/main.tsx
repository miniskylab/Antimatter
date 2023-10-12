import {EMPTY_STRING, Style} from "@miniskylab/antimatter-framework";
import {Label} from "@miniskylab/antimatter-label";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {Props, RowContext, SummaryContext} from "./models";

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

    return (
        <SummaryContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <View style={computedStyle.Row}>
                    <Label style={computedStyle.Label}>{expenseLabel}</Label>
                    <RowContext.Provider value={"expense"}>
                        <Label style={computedStyle.Amount}>{expenseAmount.toLocaleString("en-us")}</Label>
                    </RowContext.Provider>
                </View>
                <View style={computedStyle.Row}>
                    <Label style={computedStyle.Label}>{incomeLabel}</Label>
                    <RowContext.Provider value={"income"}>
                        <Label style={computedStyle.Amount}>{incomeAmount.toLocaleString("en-us")}</Label>
                    </RowContext.Provider>
                </View>
            </View>
        </SummaryContext.Provider>
    );
}
