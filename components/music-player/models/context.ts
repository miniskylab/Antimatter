import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {MusicPlayerProps} from "./props";

export const MusicPlayerContext = createContext<MusicPlayerContext>(undefined);
export type MusicPlayerContext = ComponentContext<MusicPlayerProps>;
