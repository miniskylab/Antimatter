import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";

export const CardContext = createContext<CardContext>({});
export type CardContext = ComponentContext<Props>;
