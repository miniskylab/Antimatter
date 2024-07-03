import {Reflection} from "../consts";

export function ComponentName(componentName: string)
{
    return (constructor: object): void =>
    {
        Reflect.defineMetadata(Reflection.getMetadataKey(ComponentName.name), componentName, constructor);
    };
}
