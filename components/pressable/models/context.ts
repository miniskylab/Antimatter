import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {PressableProps} from "./props";
import {PressableState} from "./state";

export const PressableContext = createContext<PressableContext>(undefined);
export type PressableContext = ComponentContext<PressableProps, PressableState>;
