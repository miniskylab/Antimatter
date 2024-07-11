import {AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Text} from "@miniskylab/antimatter-text";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {PipIndexContext, PipsContext, Props} from "./models";
import {getPctPipValue, getPipCount, isMilestonePip} from "./services";

/**
 * A component for displaying the marking present along the range slider.
 */
export function Component({
    style,
    minValue,
    maxValue,
    step,
    startValue = NaN,
    endValue = NaN,
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

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    const pipCount = getPipCount(step, minValue, maxValue);

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
            const pctPipValue = getPctPipValue(pipIndex, pipCount);
            pips.push(
                <PipIndexContext.Provider key={pipIndex} value={pipIndex}>
                    <View style={viewProps => ({...computedStyle.Pip(viewProps), left: `${Ts.Number.ensurePercent(pctPipValue)}%`})}/>
                </PipIndexContext.Provider>
            );
        }

        return pips;
    }

    function renderLabels(): JSX.Element[]
    {
        const labels: JSX.Element[] = [];
        for (let pipIndex = 0; pipIndex <= pipCount; pipIndex++)
        {
            if (!isMilestonePip(pipIndex, step, milestoneStep))
            {
                continue;
            }

            const pctPipValue = getPctPipValue(pipIndex, pipCount);
            labels.push(
                <PipIndexContext.Provider key={pipIndex} value={pipIndex}>
                    <Text
                        style={textProps => ({
                            ...computedStyle.Label(textProps),
                            ...isMilestonePip(pipIndex, step, milestoneStep) && {left: `${Ts.Number.ensurePercent(pctPipValue)}%`}
                        })}
                        selectable={false}
                    >
                        {Ts.Number.shorten(pctPipValue * (maxValue - minValue) + minValue)}
                    </Text>
                </PipIndexContext.Provider>
            );
        }

        return labels;
    }
}
