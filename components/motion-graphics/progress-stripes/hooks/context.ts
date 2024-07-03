import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {ProgressStripesContext, StripeIndexContext} from "../models";

export function useProgressStripesContext(): NonNullable<ProgressStripesContext> { return useContextOrThrow(ProgressStripesContext); }

export function useStripeIndexContext(): NonNullable<StripeIndexContext> { return useContextOrThrow(StripeIndexContext); }
