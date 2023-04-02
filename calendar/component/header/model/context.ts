import {createContext} from "react";

export const NavigatorDirectionContext = createContext<NavigatorDirectionContext>(undefined);
export type NavigatorDirectionContext = "forward" | "backward";
