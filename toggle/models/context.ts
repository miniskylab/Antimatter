import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {ToggleProps} from "./props";

export const ToggleContext = createContext<ToggleContext>({});
export type ToggleContext = ComponentContext<ToggleProps>;
