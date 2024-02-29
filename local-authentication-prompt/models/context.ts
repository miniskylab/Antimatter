import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {LocalAuthenticationPromptProps} from "./props";

export const LocalAuthenticationPromptContext = createContext<LocalAuthenticationPromptContext>(undefined);
export type LocalAuthenticationPromptContext = ComponentContext<LocalAuthenticationPromptProps>;
