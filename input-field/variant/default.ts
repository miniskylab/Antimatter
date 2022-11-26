import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconVariant} from "@miniskylab/antimatter-icon";
import {LabelVariant} from "@miniskylab/antimatter-label";
import {useRef} from "react";
import {Animated, Easing} from "react-native";
import {InputFieldStyle} from "../model";

export const Default: InputFieldStyle = function (inputFieldProps)
{
    const inputFieldStyle: ReturnType<typeof Default> = {};

    inputFieldStyle.Root = {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: 40,
        backgroundColor: Color.Mineshaft
    };

    inputFieldStyle.AddOn = function (iconProps)
    {
        const defaultIconStyle = IconVariant.Default(iconProps);
        const iconStyle: ReturnType<typeof inputFieldStyle.AddOn> = {...defaultIconStyle};

        iconStyle.Root = {
            ...defaultIconStyle.Root,
            width: 40,
            height: "100%",
            fontSize: 20,
            color: Color.Mineshaft,
            backgroundColor: Color.Gray
        };

        return iconStyle;
    };

    inputFieldStyle.Container = {
        flexGrow: 1,
        position: "relative"
    };

    inputFieldStyle.Placeholder = function (labelProps)
    {
        const avFontSize = useRef(new Animated.Value(16)).current;
        const avHeight = useRef(new Animated.Value(100)).current;
        const avPctHeight = avHeight.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"]
        });

        Animated.parallel([
            Animated.timing(avHeight, {
                toValue: inputFieldProps.placeholder && inputFieldProps.value ? 55 : 100,
                duration: 100,
                easing: Easing.out(Easing.linear),
                useNativeDriver: false
            }),

            Animated.timing(avFontSize, {
                toValue: inputFieldProps.placeholder && inputFieldProps.value ? 11 : 16,
                duration: 100,
                easing: Easing.out(Easing.linear),
                useNativeDriver: false
            })
        ]).start();

        const defaultLabelStyle = LabelVariant.Default(labelProps);
        const labelStyle: ReturnType<typeof inputFieldStyle.Placeholder> = {...defaultLabelStyle};

        labelStyle.Root = {
            ...defaultLabelStyle.Root,
            position: "absolute",
            alignItems: "flex-start",
            width: "100%",
            height: avPctHeight as unknown as string,
            paddingLeft: 12,
            color: Color.Gray,
            fontSize: avFontSize as unknown as number
        };

        return labelStyle;
    };

    inputFieldStyle.TextBox = function ()
    {
        const avPaddingTop = useRef(new Animated.Value(6)).current;
        const avPaddingBottom = useRef(new Animated.Value(6)).current;

        Animated.parallel([
            Animated.timing(avPaddingTop, {
                toValue: inputFieldProps.placeholder && inputFieldProps.value ? 20 : 6,
                duration: 100,
                easing: Easing.out(Easing.linear),
                useNativeDriver: false
            }),

            Animated.timing(avPaddingBottom, {
                toValue: inputFieldProps.placeholder && inputFieldProps.value ? 5 : 6,
                duration: 100,
                easing: Easing.out(Easing.linear),
                useNativeDriver: false
            })
        ]).start();

        return {
            width: "100%",
            height: "100%",
            paddingTop: avPaddingTop as unknown as number,
            paddingBottom: avPaddingBottom as unknown as number,
            paddingHorizontal: 12,
            fontSize: 14,
            color: Color.Neutral,
            backgroundColor: Color.Transparent
        };
    }();

    return inputFieldStyle;
};
