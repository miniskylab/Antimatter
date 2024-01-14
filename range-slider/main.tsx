import {AllPropertiesMustPresent, Style, Ts} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo, useRef} from "react";
import {Pips} from "./components";
import {RangeSliderContext, RangeSliderProps} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function RangeSlider({
    style = Variant.Default,
    minValue,
    maxValue,
    value,
    pipsSettings,
    knobIcon = DefaultIconSet.Circle,
    disabled = false,
    onChange
}: RangeSliderProps): JSX.Element
{
    const props: AllPropertiesMustPresent<RangeSliderProps> = {
        style, minValue, maxValue, value, knobIcon, pipsSettings, disabled, onChange
    };

    const context = useMemo<RangeSliderContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    const freeZoneWidthRef = useRef<number>(undefined);

    const computedStyle = Style.useComputedStyle(style, props);

    return (
        <RangeSliderContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <View style={computedStyle.Track}>
                    <View
                        style={computedStyle.StopperLeft}
                        onStartShouldSetResponder={() => !disabled}
                        onResponderStart={disabled ? undefined : () => { update(0); }}
                    />
                    <View
                        style={computedStyle.FreeZone}
                        onStartShouldSetResponder={() => !disabled}
                        onResponderStart={disabled ? undefined : event => { update(event.nativeEvent.locationX); }}
                        onResponderMove={disabled ? undefined : event => { update(event.nativeEvent.locationX); }}
                        onLayout={event => { freeZoneWidthRef.current = event.nativeEvent.layout.width; }}
                    >
                        <View
                            style={viewProps => ({...computedStyle.FillLeft(viewProps), width: `${toPercent(value)}%`})}
                            pointerEvents={"none"}
                        />
                        <View
                            style={viewProps => ({...computedStyle.Knob(viewProps), left: `${toPercent(value)}%`})}
                            pointerEvents={"none"}
                        >
                            <Icon style={computedStyle.KnobIcon} name={knobIcon} selectable={false}/>
                        </View>
                        <View
                            style={computedStyle.FillRight}
                            pointerEvents={"none"}
                        />
                    </View>
                    <View
                        style={computedStyle.StopperRight}
                        onStartShouldSetResponder={() => !disabled}
                        onResponderStart={disabled ? undefined : () => { update(freeZoneWidthRef.current); }}
                    />
                </View>
                {pipsSettings && (
                    <Pips.Component
                        style={computedStyle.Pips}
                        minValue={minValue}
                        maxValue={maxValue}
                        step={pipsSettings.step}
                        milestoneStep={pipsSettings.milestoneStep}
                        startValue={minValue}
                        endValue={value}
                    />
                )}
            </View>
        </RangeSliderContext.Provider>
    );

    function toValue(pctValue: number): number
    {
        return minValue + pctValue * (maxValue - minValue);
    }

    function toPercent(value: number): number
    {
        return Ts.Number.ensurePercent((value - minValue) / (maxValue - minValue));
    }

    function update(positionX: number): void
    {
        const pctValue = positionX / freeZoneWidthRef.current;
        let value = toValue(pctValue);

        if (pipsSettings?.canSnapToPip)
        {
            value = Math.round(value / (pipsSettings.step)) * pipsSettings.step;
        }

        value = Ts.Number.clamp(value, minValue, maxValue);
        onChange?.(value);
    }
}
