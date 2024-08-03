import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {SpinningDoubleGearProps} from "./props";

export const SpinningDoubleGearContext = createContext<SpinningDoubleGearContext>(undefined);
export type SpinningDoubleGearContext = ComponentContext<SpinningDoubleGearProps>;
