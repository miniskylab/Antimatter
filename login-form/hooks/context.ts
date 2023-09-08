import {useContext} from "react";
import {LoginFormContext} from "../models";

export function useLoginFormContext(): LoginFormContext { return useContext(LoginFormContext); }
