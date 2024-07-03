import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {SelfIntroductionHeroContext} from "../models";

export function useSelfIntroductionHeroContext(): NonNullable<SelfIntroductionHeroContext>
{
    return useContextOrThrow(SelfIntroductionHeroContext);
}
