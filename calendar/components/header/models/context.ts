import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";

export const HeaderContext = createContext<HeaderContext>(undefined);
export type HeaderContext = ComponentContext<Props>;

export const NavigatorDirectionContext = createContext<NavigatorDirectionContext>(undefined);
export type NavigatorDirectionContext = "forward" | "backward";
