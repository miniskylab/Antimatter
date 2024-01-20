import {Context, useContext} from "react";
import {Error} from "../typescript";

export function useContextOrThrow<T>(context: Context<T>): NonNullable<T>
{
    const contextValue = useContext(context);
    Error.throwIfNullOrUndefined(contextValue);

    return contextValue;
}
