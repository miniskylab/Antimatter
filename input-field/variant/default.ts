import {Color} from "@miniskylab/antimatter-color-scheme";
import {IconStyle, IconVariant} from "@miniskylab/antimatter-icon";
import {LabelStyle, LabelVariant} from "@miniskylab/antimatter-label";
import {useEffect, useRef} from "react";
import {Animated, Easing} from "react-native";
import {Context} from "../hook";
import {InputFieldStyle} from "../model";

const InputField__AddOn: IconStyle = function (iconProps)
{
    const defaultIconStyle = IconVariant.Default(iconProps);
    const iconStyle: ReturnType<IconStyle> = {...defaultIconStyle};

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

const InputField__Placeholder: LabelStyle = function (labelProps)
{
    const inputFieldContext = Context.useInputFieldContext();

    const labelFontSize = useRef(new Animated.Value(16)).current;
    const labelHeight = useRef(new Animated.Value(100)).current;
    const labelPctHeight = labelHeight.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"]
    });

    useEffect(() =>
    {
        if (inputFieldContext.props.placeholder)
        {
            Animated.parallel([
                Animated.timing(labelHeight, {
                    toValue: inputFieldContext.props.value ? 55 : 100,
                    duration: 100,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: false
                }),
                Animated.timing(labelFontSize, {
                    toValue: inputFieldContext.props.value ? 11 : 16,
                    duration: 100,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: false
                })
            ]).start();
        }
    }, [inputFieldContext.props.value]);

    const defaultLabelStyle = LabelVariant.Default(labelProps);
    const labelStyle: ReturnType<LabelStyle> = {...defaultLabelStyle};

    labelStyle.Root = {
        ...defaultLabelStyle.Root,
        position: "absolute",
        alignItems: "flex-start",
        width: "100%",
        height: labelPctHeight as unknown as string,
        paddingLeft: 12,
        color: Color.Gray,
        fontSize: labelFontSize as unknown as number
    };

    return labelStyle;
};

export const Default: InputFieldStyle = function (inputFieldProps)
{
    const textBoxPaddingTop = useRef(new Animated.Value(6)).current;
    const textBoxPaddingBottom = useRef(new Animated.Value(6)).current;

    useEffect(() =>
    {
        if (inputFieldProps.placeholder)
        {
            Animated.parallel([
                Animated.timing(textBoxPaddingTop, {
                    toValue: inputFieldProps.value ? 20 : 6,
                    duration: 100,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: false
                }),

                Animated.timing(textBoxPaddingBottom, {
                    toValue: inputFieldProps.value ? 5 : 6,
                    duration: 100,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: false
                })
            ]).start();
        }
    }, [inputFieldProps.value]);

    const inputFieldStyle: ReturnType<InputFieldStyle> = {};

    inputFieldStyle.Root = {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: 40,
        backgroundColor: Color.Mineshaft
    };

    inputFieldStyle.Container = {
        flexGrow: 1,
        position: "relative"
    };

    inputFieldStyle.TextBox = {
        width: "100%",
        height: "100%",
        paddingTop: textBoxPaddingTop as unknown as number,
        paddingBottom: textBoxPaddingBottom as unknown as number,
        paddingHorizontal: 12,
        fontSize: 14,
        color: Color.Neutral,
        backgroundColor: Color.Transparent
    };

    inputFieldStyle.AddOn = InputField__AddOn;
    inputFieldStyle.Placeholder = InputField__Placeholder;

    return inputFieldStyle;
};
