import {useContext} from "react";
import {InputFieldContext} from "../models";

export function useInputFieldContext(): InputFieldContext { return useContext(InputFieldContext); }
