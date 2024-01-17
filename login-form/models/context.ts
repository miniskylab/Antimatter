import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {LoginFormProps} from "./props";
import {LoginFormState} from "./state";

export const LoginFormContext = createContext<LoginFormContext>(undefined);
export type LoginFormContext = ComponentContext<LoginFormProps, LoginFormState>;
