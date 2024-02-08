export type Nullable<T> = T | null;
export type CanBeUndefined<T> = T | undefined;
export type Modify<T, R> = Omit<T, keyof R> & R;
export type Enum = Record<string, number | string>;
export type Dynamic<T> = T & { dynamics?: (() => object | false)[]; };
export type AllPropertiesMustPresent<T> = { [K in keyof Required<T>]: T[K]; };
