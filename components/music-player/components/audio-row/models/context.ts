import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {Props} from "./props";

export const AudioRowContext = createContext<AudioRowContext>(undefined);
export type AudioRowContext = ComponentContext<Props>;
