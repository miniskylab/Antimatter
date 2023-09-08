import {useContext} from "react";
import {ControlContext} from "../models";

export function useControlContext(): ControlContext { return useContext(ControlContext); }
