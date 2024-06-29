import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {TransactionTableContext} from "../models";

export function useTransactionTableContext(): NonNullable<TransactionTableContext> { return useContextOrThrow(TransactionTableContext); }
