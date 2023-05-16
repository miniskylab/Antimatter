import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {ButtonProps} from "./props";

export const ButtonContext = createContext<ButtonContext>({});
export type ButtonContext = ComponentContext<ButtonProps>;
