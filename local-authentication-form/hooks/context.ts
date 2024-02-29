import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {LocalAuthenticationFormContext} from "../models";

export function useLocalAuthenticationFormContext(): NonNullable<LocalAuthenticationFormContext>
{
    return useContextOrThrow(LocalAuthenticationFormContext);
}
