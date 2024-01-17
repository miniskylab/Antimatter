import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {HeaderContext, NavigatorDirectionContext} from "../models";

export function useHeaderContext(): NonNullable<HeaderContext> { return useContextOrThrow(HeaderContext); }

export function useNavigatorDirectionContext(): NonNullable<NavigatorDirectionContext>
{
    return useContextOrThrow(NavigatorDirectionContext);
}
