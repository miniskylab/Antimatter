import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {PipIndexContext, PipsContext} from "../models";

export function usePipsContext(): NonNullable<PipsContext> { return useContextOrThrow(PipsContext); }

export function usePipIndexContext(): NonNullable<PipIndexContext> { return useContextOrThrow(PipIndexContext); }
