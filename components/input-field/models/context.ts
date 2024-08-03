import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {InputFieldProps} from "./props";

export const InputFieldContext = createContext<InputFieldContext>(undefined);
export type InputFieldContext = ComponentContext<InputFieldProps>;
