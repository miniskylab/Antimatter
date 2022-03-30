import {ComponentProps} from "./component-props";
import {ComponentStyles} from "./component-styles";

export type ComponentExportProps<TProps extends ComponentProps, TVariant extends number, TModifications = unknown> =
    Omit<TProps, "variant" | keyof TModifications> & { variant?: TVariant | ComponentStyles | string } & TModifications;
