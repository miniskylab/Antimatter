import {ComponentProps} from "../classes";
import {CanBeUndefined} from "../types";

export type WithoutStyle<TProps extends ComponentProps<TProps["style"]>> = Omit<TProps, "style">;
export type ComponentContext<P = undefined, S = undefined> = CanBeUndefined<
    P extends undefined
        ? S extends undefined
            ? undefined
            : { readonly state: S; }
        : S extends undefined
            ? { readonly props: P; }
            : { readonly props: P; readonly state: S; }
>;
