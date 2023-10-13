import "reflect-metadata";

export function getMetadataKey(key: string): string { return `antimatter:anotation:${key}`; }

export function getValue<T = unknown>(decorator: (constructor: unknown) => void, target: unknown): T
{
    const metadataKey = getMetadataKey(decorator.name);

    return (
        Reflect.getMetadata(metadataKey, Object.getPrototypeOf(target).constructor)
        ||
        Reflect.getMetadata(metadataKey, Object.getPrototypeOf(new (target as FunctionConstructor)()).constructor)
    );
}
