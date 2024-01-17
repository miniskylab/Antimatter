import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {NavMenuContext} from "../models";

export function useNavMenuContext(): NonNullable<NavMenuContext> { return useContextOrThrow(NavMenuContext); }
