import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";

export const BootstrapEventContext = createContext<BootstrapEventContext>(undefined);
export type BootstrapEventContext = ComponentContext<Props>;
