import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";

export const HeaderContext = createContext<HeaderContext>(undefined);
export type HeaderContext = ComponentContext<Props>;
