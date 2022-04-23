import {ComponentProps} from "@miniskylab/antimatter-model";

export type SerializedProps<TProps extends ComponentProps, TModifications = unknown> =
    Omit<TProps, "variant" | keyof TModifications> & { variant?: string } & TModifications;
