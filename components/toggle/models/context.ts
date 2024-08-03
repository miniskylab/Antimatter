import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {ToggleProps} from "./props";

export const ToggleContext = createContext<ToggleContext>(undefined);
export type ToggleContext = ComponentContext<ToggleProps>;
