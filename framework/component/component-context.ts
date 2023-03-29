export type ComponentContext<P = never, S = never> = {
    readonly props?: Required<P>;
    readonly state?: Required<S>;
}
