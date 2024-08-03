import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {PressableProps} from "./props";
import {type PressableState} from "./state";

export const PressableContext = createContext<PressableContext>(undefined);
export type PressableContext = ComponentContext<PressableProps, PressableState>;
