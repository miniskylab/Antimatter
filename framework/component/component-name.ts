import {getMetadataKey} from "../decorator";

export function ComponentName(componentName: string)
{
    return (constructor: unknown): void =>
    {
        Reflect.defineMetadata(getMetadataKey(ComponentName.name), componentName, constructor);
    };
}
