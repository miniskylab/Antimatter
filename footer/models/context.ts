import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {FooterProps} from "./props";

export const FooterContext = createContext<FooterContext>(undefined);
export type FooterContext = ComponentContext<FooterProps>;
