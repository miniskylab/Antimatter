import {useContext} from "react";
import {ToggleContext} from "../model";

export function useToggleContext(): ToggleContext { return useContext(ToggleContext); }
