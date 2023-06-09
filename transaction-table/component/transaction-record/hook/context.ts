import {useContext} from "react";
import {TransactionRecordContext} from "../model";

export function useTransactionRecordContext(): TransactionRecordContext { return useContext(TransactionRecordContext); }
