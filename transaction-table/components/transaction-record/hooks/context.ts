import {useContext} from "react";
import {TagKindContext, TransactionRecordContext} from "../models";

export function useTransactionRecordContext(): TransactionRecordContext { return useContext(TransactionRecordContext); }

export function useTagKindContext(): TagKindContext { return useContext(TagKindContext); }
