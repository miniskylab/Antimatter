import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {SelfIntroductionHeroContext, SimpleInfoContext} from "../models";

export function useSelfIntroductionHeroContext(): NonNullable<SelfIntroductionHeroContext>
{
    return useContextOrThrow(SelfIntroductionHeroContext);
}

export function useSimpleInfoContext(): NonNullable<SimpleInfoContext> { return useContextOrThrow(SimpleInfoContext); }
