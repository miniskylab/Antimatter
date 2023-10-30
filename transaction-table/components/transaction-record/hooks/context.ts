import {useContext} from "react";
import {TagMetadataContext, TransactionRecordContext} from "../models";

export function useTransactionRecordContext(): TransactionRecordContext { return useContext(TransactionRecordContext); }

export function useTagMetadataContext(): TagMetadataContext { return useContext(TagMetadataContext); }
