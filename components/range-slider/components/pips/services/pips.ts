import {isNullOrUndefined} from "@miniskylab/antimatter-framework";

export function getPipCount(step: number, minValue: number, maxValue: number) { return Math.round((maxValue - minValue) / step); }

export function getPctPipValue(pipIndex: number, pipCount: number): number { return pipIndex * (1 / pipCount); }

export function isMilestonePip(pipIndex: number, step: number, milestoneStep: number | undefined): boolean
{
    if (isNullOrUndefined(milestoneStep))
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

export function isHighlightedPip(pipIndex: number, pipCount: number, minValue: number, maxValue: number, startValue: number | undefined,
    endValue: number | undefined): boolean
{
    if (isNullOrUndefined(startValue) || isNullOrUndefined(endValue))
    {
        return false;
    }

    const pctPipValue = getPctPipValue(pipIndex, pipCount);
    const pctStartValue = (startValue - minValue) / (maxValue - minValue);
    const pctEndValue = (endValue - minValue) / (maxValue - minValue);

    return Math.abs(pctPipValue - pctStartValue) < 0.001 ||
           Math.abs(pctPipValue - pctEndValue) < 0.001 ||
           (pctStartValue < pctPipValue && pctPipValue < pctEndValue);
}
