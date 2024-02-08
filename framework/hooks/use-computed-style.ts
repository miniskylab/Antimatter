import {ComponentProps} from "../classes";
import {Dynamic} from "../types";

type Style = (props: unknown, state: unknown) => Dynamic<object | false> | Style;
export function useComputedStyle<TStyle extends Style>(style: TStyle, props: ComponentProps<TStyle>, state?: unknown): ReturnType<TStyle>
{
    const {style: _, ...propsWithoutStyle} = props;
    let computedStyle = style(propsWithoutStyle, state);

    if (typeof computedStyle === "object")
    {
        const dynamics = computedStyle.dynamics;
        delete computedStyle.dynamics;

        dynamics?.forEach(dynamic => { computedStyle = {...computedStyle, ...dynamic()}; });
    }

    return computedStyle as ReturnType<TStyle>;
}
