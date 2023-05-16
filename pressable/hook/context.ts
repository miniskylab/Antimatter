import {useContext} from "react";
import {PressableContext} from "../model";

export function usePressableContext(): PressableContext { return useContext(PressableContext); }
