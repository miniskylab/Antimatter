import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {LocalAuthenticationPromptContext} from "../models";

export function useLocalAuthenticationPromptContext(): NonNullable<LocalAuthenticationPromptContext>
{
    return useContextOrThrow(LocalAuthenticationPromptContext);
}
