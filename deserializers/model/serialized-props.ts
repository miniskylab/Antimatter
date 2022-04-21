import {ComponentProps} from "@miniskylab/antimatter-component";

export type SerializedProps<TProps extends ComponentProps, TModifications = unknown> =
    Omit<TProps, "variant" | keyof TModifications> & { variant?: string } & TModifications;
