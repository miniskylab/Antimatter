import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {TransactionRecordContext} from "../models";

export function useTransactionRecordContext(): NonNullable<TransactionRecordContext> { return useContextOrThrow(TransactionRecordContext); }
