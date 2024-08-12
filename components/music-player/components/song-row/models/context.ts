import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {type Props} from "./props";

export const SongRowContext = createContext<SongRowContext>(undefined);
export type SongRowContext = ComponentContext<Props>;
