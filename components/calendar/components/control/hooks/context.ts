import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {ControlContext} from "../models";

export function useControlContext(): NonNullable<ControlContext> { return useContextOrThrow(ControlContext); }
