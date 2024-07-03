import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {LoginFormContext} from "../models";

export function useLoginFormContext(): NonNullable<LoginFormContext> { return useContextOrThrow(LoginFormContext); }
