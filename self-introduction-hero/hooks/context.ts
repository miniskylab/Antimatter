import {useContext} from "react";
import {PersonalInfoContext, SelfIntroductionHeroContext} from "../models";

export function useSelfIntroductionHeroContext(): SelfIntroductionHeroContext { return useContext(SelfIntroductionHeroContext); }

export function usePersonalInfoContext(): PersonalInfoContext { return useContext(PersonalInfoContext); }
