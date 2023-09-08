import {useContext} from "react";
import {ToggleContext} from "../models";

export function useToggleContext(): ToggleContext { return useContext(ToggleContext); }
