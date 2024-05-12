import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {MusicPlayerProps} from "./props";

export const MusicPlayerContext = createContext<MusicPlayerContext>(undefined);
export type MusicPlayerContext = ComponentContext<MusicPlayerProps>;

export const ButtonTypeContext = createContext<ButtonTypeContext>(undefined);
export type ButtonTypeContext = "play-pause" | "next" | "previous" | "shuffle" | "repeat" | "playlist" | undefined;
