import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {InputFieldProps} from "./props";

export const InputFieldContext = createContext<InputFieldContext>({});
export type InputFieldContext = ComponentContext<InputFieldProps>;
