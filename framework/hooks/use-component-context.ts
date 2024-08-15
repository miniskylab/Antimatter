import {useMemo} from "react";
import {ComponentContext} from "../types";

export function useComponentContext<
    TComponentContext extends ComponentContext<
        object | undefined,
        object | undefined,
        object | undefined
    >
>(context: NonNullable<TComponentContext>): NonNullable<TComponentContext>
{
    return useMemo<NonNullable<TComponentContext>>(
        () => context,
        [
            ...getDeps(context["props" as keyof ComponentContext]),
            ...getDeps(context["state" as keyof ComponentContext]),
            ...getDeps(context["extra" as keyof ComponentContext])
        ]
    );
}

function getDeps(object: object | undefined): unknown[]
{
    return Object.values(object ?? {});
}
