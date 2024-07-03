import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {NavbarProps} from "./props";

export const NavbarContext = createContext<NavbarContext>(undefined);
export type NavbarContext = ComponentContext<NavbarProps>;
