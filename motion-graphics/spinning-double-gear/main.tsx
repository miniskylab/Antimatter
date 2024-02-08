import {AllPropertiesMustPresent, Ts, useComputedStyle} from "@miniskylab/antimatter-framework";
import {Icon} from "@miniskylab/antimatter-icon";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View} from "@miniskylab/antimatter-view";
import React, {JSX, useMemo} from "react";
import {SpinningDoubleGearAnimationHook} from "./hooks";
import {SpinningDoubleGearContext, SpinningDoubleGearProps} from "./models";
import * as Variant from "./variants";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function SpinningDoubleGear({
    style = Variant.Default,
    msAnimationDuration = 2800
}: SpinningDoubleGearProps): JSX.Element
{
    const props: AllPropertiesMustPresent<SpinningDoubleGearProps> = {
        style, msAnimationDuration
    };

    const context = useMemo<SpinningDoubleGearContext>(
        () => ({props}),
        [...Object.values(props)]
    );

    Ts.Error.throwIfNullOrUndefined(style);
    const computedStyle = useComputedStyle(style, props);

    const {clockwiseRotation, antiClockwiseRotation} = SpinningDoubleGearAnimationHook.useDoubleGearAnimation(msAnimationDuration);

    return (
        <SpinningDoubleGearContext.Provider value={context}>
            <View style={computedStyle.Root}>
                <View style={computedStyle.GearContainer}>
                    <Icon
                        style={iconProps => ({...computedStyle.Gear1(iconProps), dynamics: [() => clockwiseRotation]})}
                        name={DefaultIconSet.Gear}
                        selectable={false}
                    />
                    <Icon
                        style={iconProps => ({...computedStyle.Gear2(iconProps), dynamics: [() => antiClockwiseRotation]})}
                        name={DefaultIconSet.Gear}
                        selectable={false}
                    />
                </View>
            </View>
        </SpinningDoubleGearContext.Provider>
    );
}
