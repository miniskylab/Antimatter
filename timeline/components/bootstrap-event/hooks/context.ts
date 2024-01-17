import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {BootstrapEventContext} from "../models";

export function useBootstrapEventContext(): NonNullable<BootstrapEventContext> { return useContextOrThrow(BootstrapEventContext); }
