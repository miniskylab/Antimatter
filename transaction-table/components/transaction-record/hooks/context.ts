import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {TagMetadataContext, TransactionRecordContext} from "../models";

export function useTransactionRecordContext(): NonNullable<TransactionRecordContext> { return useContextOrThrow(TransactionRecordContext); }

export function useTagMetadataContext(): NonNullable<TagMetadataContext> { return useContextOrThrow(TagMetadataContext); }
