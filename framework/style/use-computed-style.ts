import {ComponentProps} from "../component";
import {Animated} from "../typescript";

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
