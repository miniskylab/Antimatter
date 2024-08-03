import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {NavButtonProps} from "./props";

export const NavButtonContext = createContext<NavButtonContext>(undefined);
export type NavButtonContext = ComponentContext<NavButtonProps>;
