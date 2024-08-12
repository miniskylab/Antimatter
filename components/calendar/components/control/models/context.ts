import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {type Props} from "./props";

export const ControlContext = createContext<ControlContext>(undefined);
export type ControlContext = ComponentContext<Props>;
