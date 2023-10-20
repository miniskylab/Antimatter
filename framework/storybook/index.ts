export * from "./hooks";
export * from "./arg-types";
export * from "./components";

export function getVariantName<T>(variants: Record<string, unknown>, possiblyVariantValue: T): T
{
    return Object.keys(variants).find(key => variants[key] === possiblyVariantValue) as T;
}
