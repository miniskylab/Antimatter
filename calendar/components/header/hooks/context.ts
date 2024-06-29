import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {HeaderContext} from "../models";

export function useHeaderContext(): NonNullable<HeaderContext> { return useContextOrThrow(HeaderContext); }
