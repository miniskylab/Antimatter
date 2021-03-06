import {Decorator} from "@miniskylab/antimatter-decorator";

export function ComponentName(componentName: string)
{
    return (constructor: unknown): void =>
    {
        Reflect.defineMetadata(Decorator.getMetadataKey(ComponentName.name), componentName, constructor);
    };
}
