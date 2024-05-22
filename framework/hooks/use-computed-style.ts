import {ComponentProps} from "../classes";
import type {Animated} from "../types";

type Style = (props: unknown, state: unknown) => Animated<object | false> | Style;
export function useComputedStyle<TStyle extends Style>(style: TStyle, props: ComponentProps<TStyle>, state?: unknown)
{
    const {style: _, ...propsWithoutStyle} = props;
    let computedStyle = style(propsWithoutStyle, state);
    let imperativeHandles: object | undefined;

    if (typeof computedStyle === "object")
    {
        const animations = typeof computedStyle.animations === "function" ? computedStyle.animations() : computedStyle.animations;
        delete computedStyle.animations;

        const animationOverride = computedStyle.animationOverride;
        delete computedStyle.animationOverride;

        animations?.forEach(animation =>
        {
            const {animatedStyle, imperativeAnimationHandles} = animation();

            computedStyle = {...computedStyle, ...animatedStyle};
            imperativeHandles = {...imperativeHandles, ...imperativeAnimationHandles};
        });

        computedStyle = {...computedStyle, ...animationOverride};
    }

    return {
        computedStyle: computedStyle as ReturnType<TStyle>,
        imperativeHandles
    };
}
