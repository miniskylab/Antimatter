import {ImageStyle, TextStyle, ViewStyle} from "react-native";
import {ComponentProps} from "../classes";
import {CanBeUndefined} from "../types";

export type ComponentAnimation = {
    readonly animatedStyle: ViewStyle | TextStyle | ImageStyle;
    readonly imperativeAnimationHandles?: object;
};

export type WithoutStyle<TProps extends ComponentProps<TProps["style"]>> = Omit<TProps, "style">;
export type Animated<TStyle> = TStyle & {
    animations?: (() => ComponentAnimation)[];
    animationOverride?: ViewStyle | TextStyle | ImageStyle;
};

export type ComponentContext<TProps = undefined, TState = undefined> = CanBeUndefined<
    TProps extends undefined
        ? TState extends undefined
            ? undefined
            : { readonly state: TState; }
        : TState extends undefined
            ? { readonly props: TProps; }
            : { readonly props: TProps; readonly state: TState; }
>;
