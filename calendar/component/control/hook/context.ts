import {useContext} from "react";
import {ControlContext} from "../model";

export function useControlContext(): ControlContext { return useContext(ControlContext); }
