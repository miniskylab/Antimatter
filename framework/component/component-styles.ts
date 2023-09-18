import {ShadowStyleIOS, TextStyle} from "react-native";
import {ComponentProps} from "./component-props";

export type Styled<TProps extends ComponentProps<TProps["style"]>> = Required<Omit<TProps, "style">>;
export type ShadowStyle = () => ShadowStyleIOS;

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
