import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {SelfIntroductionHeroProps} from "./props";

export const SelfIntroductionHeroContext = createContext<SelfIntroductionHeroContext>(undefined);
export type SelfIntroductionHeroContext = ComponentContext<SelfIntroductionHeroProps>;

export const PersonalInfoContext = createContext<PersonalInfoContext>(undefined);
export type PersonalInfoContext = "location" | "email";
