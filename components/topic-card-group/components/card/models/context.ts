import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";

export const CardContext = createContext<CardContext>(undefined);
export type CardContext = ComponentContext<Props>;
