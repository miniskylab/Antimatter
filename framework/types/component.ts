import {RefObject} from "react";
import {ComponentProps} from "../classes";
import {CanBeUndefined} from "../types";

export type WithoutStyle<TProps extends ComponentProps<TProps["style"]>> = Omit<TProps, "style">;
export type ComponentContext<P = undefined, S = undefined, R = undefined> = CanBeUndefined<
    P extends undefined
        ? S extends undefined
            ? R extends undefined
                ? undefined
                : { readonly ref: RefObject<R>; }
            : R extends undefined
                ? { readonly state: S; }
                : { readonly state: S; readonly ref: RefObject<R>; }
        : S extends undefined
            ? R extends undefined
                ? { readonly props: P; }
                : { readonly props: P; readonly ref: RefObject<R>; }
            : R extends undefined
                ? { readonly props: P; readonly state: S; }
                : { readonly props: P; readonly state: S; readonly ref: RefObject<R>; }
>;
