import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {DialogProps} from "./props";

export const DialogContext = createContext<DialogContext>(undefined);
export type DialogContext = ComponentContext<DialogProps>;
