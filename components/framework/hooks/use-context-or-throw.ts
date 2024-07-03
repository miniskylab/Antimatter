import {Context, useContext} from "react";
import {Ts} from "../functions";

export function useContextOrThrow<T>(context: Context<T>): NonNullable<T>
{
    const contextValue = useContext(context);
    Ts.Error.throwIfNullOrUndefined(contextValue);

    return contextValue;
}
