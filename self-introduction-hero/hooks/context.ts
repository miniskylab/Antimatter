import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {PersonalInfoContext, SelfIntroductionHeroContext} from "../models";

export function useSelfIntroductionHeroContext(): NonNullable<SelfIntroductionHeroContext>
{
    return useContextOrThrow(SelfIntroductionHeroContext);
}

export function usePersonalInfoContext(): NonNullable<PersonalInfoContext> { return useContextOrThrow(PersonalInfoContext); }
