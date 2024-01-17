import {Context, useContext} from "react";
import {Undefinable} from "../predefined";
import {Error} from "../typescript";

export type ComponentContext<P = undefined, S = undefined> = Undefinable<
    P extends undefined
        ? S extends undefined
            ? undefined
            : { readonly state: S; }
        : S extends undefined
            ? { readonly props: P; }
            : { readonly props: P; readonly state: S; }
>;

export function useContextOrThrow<T>(context: Context<T>): NonNullable<T>
{
    const contextValue = useContext(context);
    Error.throwIfNullOrUndefined(contextValue);

    return contextValue;
}
