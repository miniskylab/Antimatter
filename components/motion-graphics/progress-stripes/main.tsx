import {type AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useEffect, useMemo, useState} from "react";
import {type LayoutChangeEvent} from "react-native";
import {ProgressStripesContext, ProgressStripesProps, type ProgressStripesState, StripeIndexContext} from "./models";
import * as Variant from "./variants";

export function ProgressStripes({
    style = Variant.Default,
    msAnimationDuration = 300
}: ProgressStripesProps): JSX.Element
{
    const props: AllPropertiesMustPresent<ProgressStripesProps> = {
        style, msAnimationDuration
    };

    const [state, setState] = useState<ProgressStripesState>({
        stripeCount: 1,
        stripeWidth: 0,
        rootContainerWidth: 0
    });

    const context = useMemo<ProgressStripesContext>(
        () => ({props, state}),
        [...Object.values(props), ...Object.values(state)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const {computedStyle} = useComputedStyle(style, props);

    useEffect(() =>
    {
        const newStripeCount = 2 + Math.ceil(state.rootContainerWidth / state.stripeWidth);
        if (isFinite(newStripeCount))
        {
            setState(prevState => ({...prevState, stripeCount: newStripeCount}));
        }
    }, [state.rootContainerWidth, state.stripeWidth]);

    return (
        <ProgressStripesContext.Provider value={context}>
            <View style={computedStyle.Root} onLayout={onLayoutRoot}>
                <View style={computedStyle.Slider}>
                    {Array(state.stripeCount).fill(undefined).map((_, stripeIndex) => (
                        <StripeIndexContext.Provider key={stripeIndex} value={stripeIndex}>
                            <View style={computedStyle.Stripe} onLayout={stripeIndex === 0 ? onLayoutStripe : undefined}/>
                        </StripeIndexContext.Provider>
                    ))}
                </View>
            </View>
        </ProgressStripesContext.Provider>
    );

    function onLayoutRoot({nativeEvent}: LayoutChangeEvent): void
    {
        setState(prevState => ({...prevState, rootContainerWidth: nativeEvent.layout.width}));
    }

    function onLayoutStripe({nativeEvent}: LayoutChangeEvent): void
    {
        setState(prevState => ({...prevState, stripeWidth: nativeEvent.layout.width}));
    }
}
