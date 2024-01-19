import {ShadowStyleIOS, TextStyle} from "react-native";
import {Animated} from "../predefined";
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

type Style = (props: unknown, state: unknown) => Animated<object> | Style;
export function useComputedStyle<TStyle extends Style>(style: TStyle, props: ComponentProps<TStyle>, state?: unknown): ReturnType<TStyle>
{
    const {style: _, ...propsWithoutStyle} = props;
    let computedStyle = style(propsWithoutStyle, state);

    if (typeof computedStyle === "object")
    {
        const {animations: _, ...computedStyleWithoutAnimations} = computedStyle;
        computedStyle.animations?.forEach(animation => { computedStyle = {...computedStyleWithoutAnimations, ...animation()}; });
    }

    return computedStyle as ReturnType<TStyle>;
}
