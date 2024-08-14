import {TextStyle} from "react-native";

export function inheritTextStyleFrom<TStyle extends TextStyle>(style: TStyle): TextStyle
{
    return {
        color: style.color,
        backgroundColor: style.backgroundColor,
        cursor: style.cursor,
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
