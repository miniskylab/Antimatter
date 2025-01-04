import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {TagIdContext, TransactionRecordContext} from "../models";

export function useTransactionRecordContext(): NonNullable<TransactionRecordContext> { return useContextOrThrow(TransactionRecordContext); }

export function useTagIdContext(): NonNullable<TagIdContext> { return useContextOrThrow(TagIdContext); }
