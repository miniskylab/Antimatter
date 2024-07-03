import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {NavButtonContext} from "../models";

export function useNavButtonContext(): NonNullable<NavButtonContext> { return useContextOrThrow(NavButtonContext); }
