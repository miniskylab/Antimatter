import "reflect-metadata";

export const Reflection = new class
{
    getMetadataKey(key: string): string { return `antimatter:anotation:${key}`; }

    getDecoratorValue<T = unknown>(decorator: (constructor: unknown) => void, target: unknown): T
    {
        const metadataKey = this.getMetadataKey(decorator.name);

        return (
            Reflect.getMetadata(metadataKey, Object.getPrototypeOf(target).constructor)
            ||
            Reflect.getMetadata(metadataKey, Object.getPrototypeOf(new (target as FunctionConstructor)()).constructor)
        );
    }
};
