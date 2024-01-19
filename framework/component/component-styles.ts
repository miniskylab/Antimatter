import {ShadowStyleIOS, TextStyle} from "react-native";
import {ComponentProps} from "./component-props";

export type ShadowStyle = () => ShadowStyleIOS;
export type WithoutStyle<TProps extends ComponentProps<TProps["style"]>> = Omit<TProps, "style">;

export function inheritTextStyleFrom<TStyle extends TextStyle>(style: TStyle): TextStyle
{
    return {
        color: style.color,
        backgroundColor: style.backgroundColor,
        fontSize: style.fontSize,
        fontStyle: style.fontStyle,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        textAlign: style.textAlign,
        borderRadius: style.borderRadius,
        textDecorationLine: style.textDecorationLine,
        textDecorationStyle: style.textDecorationStyle
    };
}

export function notRequiredAsParentElementIsHidden<T>(): T
{
    return undefined as T;
}
