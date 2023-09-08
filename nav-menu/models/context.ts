import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {NavMenuProps} from "./props";

export const NavMenuContext = createContext<NavMenuContext>({});
export type NavMenuContext = ComponentContext<NavMenuProps>;
