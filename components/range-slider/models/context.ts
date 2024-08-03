import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {RangeSliderProps} from "./props";

export const RangeSliderContext = createContext<RangeSliderContext>(undefined);
export type RangeSliderContext = ComponentContext<RangeSliderProps>;
