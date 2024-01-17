import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";

export const EventContext = createContext<EventContext>(undefined);
export type EventContext = ComponentContext<Props>;

export const RowContext = createContext<RowContext>(undefined);
export type RowContext = "time" | "duration" | "location" | "description";
