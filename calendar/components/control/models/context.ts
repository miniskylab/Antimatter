import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";

export const ControlContext = createContext<ControlContext>({});
export type ControlContext = ComponentContext<Props>;
