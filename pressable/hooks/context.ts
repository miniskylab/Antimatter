import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {PressableContext} from "../models";

export function usePressableContext(): NonNullable<PressableContext> { return useContextOrThrow(PressableContext); }
