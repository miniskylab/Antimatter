import {Color} from "@miniskylab/antimatter-color-scheme";
import {Icon, IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {DefaultIconSet} from "@miniskylab/antimatter-typography";
import {View, ViewStyle, ViewVariant} from "@miniskylab/antimatter-view";
import React, {JSX, useEffect, useRef} from "react";
import {Animated, Easing} from "react-native";

/**
 * <p style="color: #9B9B9B; font-style: italic">(no description available)</p>
 */
export function SpinningDoubleGear({
    style,
    pxGearSize = 120,
    pxGearDistance = 42,
    msAnimationDuration = 2800
}: {
    style?: ViewStyle;
    pxGearSize?: number;
    pxGearDistance?: number;
    msAnimationDuration?: number;
}): JSX.Element
{
    const size = pxGearSize + 2 * pxGearDistance;

    const initialRotation = 0;
    const animatedRotation = useRef(new Animated.Value(initialRotation)).current;
    const interpolatedRotation = animatedRotation.interpolate({
        inputRange: [0, 360],
        outputRange: ["0deg", "360deg"]
    });
    const interpolatedReverseRotation = animatedRotation.interpolate({
        inputRange: [0, 360],
        outputRange: ["-0deg", "-360deg"]
    });

    const SpinningDoubleGear__Gear1: IconStyle = function (iconProps)
    {
        return {
            ...IconVariant.Default(iconProps),
            position: "absolute",
            top: -pxGearDistance,
            left: -pxGearDistance,
            fontSize: pxGearSize,
            color: Color.White,
            transform: [{rotate: interpolatedRotation}]
        };
    };

    const SpinningDoubleGear__Gear2: IconStyle = function (iconProps)
    {
        return {
            ...SpinningDoubleGear__Gear1(iconProps),
            top: pxGearDistance,
            left: pxGearDistance,
            transform: [{rotate: interpolatedReverseRotation}]
        };
    };

    useEffect(() =>
    {
        Animated.loop(
            Animated.timing(animatedRotation, {
                toValue: 360,
                duration: msAnimationDuration,
                easing: Easing.linear,
                useNativeDriver: false
            })
        ).start();
    }, []);

    return (
        <View
            style={viewProps => ({
                ...ViewVariant.Default(viewProps),
                width: size,
                height: size,
                ...style?.(viewProps)
            })}
        >
            <View style={() => ({marginLeft: -pxGearSize, marginTop: -pxGearSize})}>
                <Icon style={SpinningDoubleGear__Gear1} name={DefaultIconSet.Gear}/>
                <Icon style={SpinningDoubleGear__Gear2} name={DefaultIconSet.Gear}/>
            </View>
        </View>
    );
}
