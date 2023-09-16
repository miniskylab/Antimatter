import {ComponentProps} from "../component";

type Style = (props: unknown, state: unknown) => unknown;
export function useComputedStyle<TStyle extends Style>(style: TStyle, props: ComponentProps<TStyle>, state?: unknown): ReturnType<TStyle>
{
    const {style: _, ...propsWithoutStyle} = props;
    return style(propsWithoutStyle, state) as ReturnType<TStyle>;
}
