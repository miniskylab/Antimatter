import {useContext} from "react";
import {InputFieldContext} from "../model";

export function useInputFieldContext(): InputFieldContext { return useContext(InputFieldContext); }
