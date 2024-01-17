import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {FooterContext} from "../models";

export function useFooterContext(): NonNullable<FooterContext> { return useContextOrThrow(FooterContext); }
