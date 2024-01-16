import {useRef} from "react";

export function useNewKeyIfAnyOfTheseChanges(dependencies: unknown[]): number
{
    const ref = useRef<{
        key: number;
        dependencies: unknown[];
    }>({
        key: 0,
        dependencies: []
    });

    let nextKey = ref.current.key;
    for (let i = 0; i < dependencies.length; i++)
    {
        if (dependencies[i] !== ref.current.dependencies[i])
        {
            nextKey = Date.now();
            break;
        }
    }

    ref.current.key = nextKey;
    ref.current.dependencies = dependencies;

    return nextKey;
}
