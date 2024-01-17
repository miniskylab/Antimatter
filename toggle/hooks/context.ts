import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {ToggleContext} from "../models";

export function useToggleContext(): NonNullable<ToggleContext> { return useContextOrThrow(ToggleContext); }
