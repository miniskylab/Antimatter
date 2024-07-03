import {ImageStyle, TextStyle, ViewStyle} from "react-native";
import {ComponentProps} from "../classes";
import type {CanBeUndefined} from "../types";

export type WithoutStyle<TProps extends ComponentProps<TProps["style"]>> = Omit<TProps, "style">;
export type ComponentAnimation = {
    readonly animatedStyle: ViewStyle | TextStyle | ImageStyle;
    readonly imperativeAnimationHandles?: object;
};

type ComponentAnimationCreator = () => ComponentAnimation;
export type Animated<TStyle> = TStyle & {
    animations?: ComponentAnimationCreator[] | (() => ComponentAnimationCreator[]);
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
