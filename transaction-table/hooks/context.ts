import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {ControlButtonTypeContext, HrPositionContext, TransactionTableContext} from "../models";

export function useTransactionTableContext(): NonNullable<TransactionTableContext> { return useContextOrThrow(TransactionTableContext); }

export function useControlButtonTypeContext(): NonNullable<ControlButtonTypeContext> { return useContextOrThrow(ControlButtonTypeContext); }

export function useHrPositionContext(): NonNullable<HrPositionContext> { return useContextOrThrow(HrPositionContext); }
