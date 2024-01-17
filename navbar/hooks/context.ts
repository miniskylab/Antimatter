import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {NavbarContext} from "../models";

export function useNavbarContext(): NonNullable<NavbarContext> { return useContextOrThrow(NavbarContext); }
