import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";

export const EventContext = createContext<EventContext>(undefined);
export type EventContext = ComponentContext<Props>;
