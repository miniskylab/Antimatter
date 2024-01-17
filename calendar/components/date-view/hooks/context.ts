import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {DateContext, DateViewContext} from "../models";

export function useDateViewContext(): NonNullable<DateViewContext> { return useContextOrThrow(DateViewContext); }

export function useDateContext(): NonNullable<DateContext> { return useContextOrThrow(DateContext); }
