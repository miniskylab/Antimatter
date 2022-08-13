import {ComponentProps} from "./component-props";

export type Child<T extends ComponentProps> = Omit<T, keyof ComponentProps>
