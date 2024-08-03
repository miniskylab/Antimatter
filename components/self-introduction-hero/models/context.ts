import {type ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {SelfIntroductionHeroProps} from "./props";

export const SelfIntroductionHeroContext = createContext<SelfIntroductionHeroContext>(undefined);
export type SelfIntroductionHeroContext = ComponentContext<SelfIntroductionHeroProps>;
