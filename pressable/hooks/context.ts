import {useContext} from "react";
import {PressableContext} from "../models";

export function usePressableContext(): PressableContext { return useContext(PressableContext); }
