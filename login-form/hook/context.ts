import {useContext} from "react";
import {LoginFormContext} from "../model";

export function useLoginFormContext(): LoginFormContext { return useContext(LoginFormContext); }
