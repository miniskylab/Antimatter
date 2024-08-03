import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {LocalAuthenticationFormProps} from "./props";

export const LocalAuthenticationFormContext = createContext<LocalAuthenticationFormContext>(undefined);
export type LocalAuthenticationFormContext = ComponentContext<LocalAuthenticationFormProps>;
