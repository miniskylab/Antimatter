import {AllPropertiesMustPresent, Style, Ts} from "@miniskylab/antimatter-framework";
import {Label} from "@miniskylab/antimatter-label";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {HighlightedContext, MilestoneContext, PipsContext, Props} from "./models";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function Component({
    style,
    minValue,
    maxValue,
    step,
    startValue,
    endValue,
    milestoneStep
}: Props): JSX.Element
{
    const props: AllPropertiesMustPresent<Props> = {
        style, minValue, maxValue, step, startValue, endValue, milestoneStep
    };

    const context = useMemo<PipsContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const computedStyle = Style.useComputedStyle(style, props);
    const pipCount = Math.round((maxValue - minValue) / step);

    return (
        <PipsContext.Provider value={context}>
            <View style={computedStyle.Root} pointerEvents={"none"}>
                {renderPips()}
                {renderLabels()}
            </View>
        </PipsContext.Provider>
    );

    function renderPips(): JSX.Element[]
    {
        const pips: JSX.Element[] = [];
        for (let pipIndex = 0; pipIndex <= pipCount; pipIndex++)
        {
            const pctPipValue = getPctPipValue(pipIndex);
            pips.push(
                <HighlightedContext.Provider key={pipIndex} value={isHighlightedPip(pipIndex)}>
                    <MilestoneContext.Provider value={isMilestonePip(pipIndex)}>
                        <View style={viewProps => ({...computedStyle.Pip(viewProps), left: `${Ts.Number.ensurePercent(pctPipValue)}%`})}/>
                    </MilestoneContext.Provider>
                </HighlightedContext.Provider>
            );
        }

        return pips;
    }

    function renderLabels(): JSX.Element[]
    {
        const labels: JSX.Element[] = [];
        for (let pipIndex = 0; pipIndex <= pipCount; pipIndex++)
        {
            if (!isMilestonePip(pipIndex))
            {
                continue;
            }

            const pctPipValue = getPctPipValue(pipIndex);
            labels.push(
                <HighlightedContext.Provider key={pipIndex} value={isHighlightedPip(pipIndex)}>
                    <Label
                        style={labelProps => ({
                            ...computedStyle.Label(labelProps),
                            ...isMilestonePip(pipIndex) && {left: `${Ts.Number.ensurePercent(pctPipValue)}%`}
                        })}
                        selectable={false}
                    >
                        {Ts.Number.shorten(pctPipValue * (maxValue - minValue) + minValue)}
                    </Label>
                </HighlightedContext.Provider>
            );
        }

        return labels;
    }

    function getPctPipValue(pipIndex: number): number { return pipIndex * (1 / pipCount); }

    function isMilestonePip(pipIndex: number): boolean
    {
        if (Ts.Data.isNullOrUndefined(milestoneStep))
        {
            return false;
        }

        let wholeNumberPipIndex = pipIndex;
        let wholeNumberMilestoneIndexStep = milestoneStep / step;
        while (!Number.isInteger(wholeNumberPipIndex) || !Number.isInteger(wholeNumberMilestoneIndexStep))
        {
            wholeNumberPipIndex *= 10;
            wholeNumberMilestoneIndexStep *= 10;
        }

        return wholeNumberPipIndex % wholeNumberMilestoneIndexStep === 0;
    }

    function isHighlightedPip(pipIndex: number): boolean
    {
        const pctPipValue = getPctPipValue(pipIndex);
        const pctStartValue = (startValue - minValue) / (maxValue - minValue);
        const pctEndValue = (endValue - minValue) / (maxValue - minValue);

        return Math.abs(pctPipValue - pctStartValue) < 0.001 ||
               Math.abs(pctPipValue - pctEndValue) < 0.001 ||
               (pctStartValue < pctPipValue && pctPipValue < pctEndValue);
    }
}
