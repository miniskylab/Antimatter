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

export type ComponentContext<TProps = undefined, TState = undefined, TExtra = undefined> = CanBeUndefined<
    TProps extends undefined
        ? TState extends undefined
            ? TExtra extends undefined
                ? undefined
                : { readonly extra: TExtra; }
            : TExtra extends undefined
                ? { readonly state: TState; }
                : { readonly state: TState; readonly extra: TExtra; }
        : TState extends undefined
            ? TExtra extends undefined
                ? { readonly props: TProps; }
                : { readonly props: TProps; readonly extra: TExtra; }
            : TExtra extends undefined
                ? { readonly props: TProps; readonly state: TState; }
                : { readonly props: TProps; readonly state: TState; readonly extra: TExtra; }
>;
