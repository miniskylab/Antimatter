import {CSS} from "../models/css";
import {ComponentProps} from "./component-props";

export type Export<TProps extends ComponentProps, TVariant extends number, TModifications = unknown> =
    Omit<TProps, "variant" | keyof TModifications> & { variant?: TVariant | CSS | string } & TModifications;
