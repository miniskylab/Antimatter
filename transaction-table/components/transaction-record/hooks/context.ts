import {useContext} from "react";
import {TransactionRecordContext} from "../models";

export function useTransactionRecordContext(): TransactionRecordContext { return useContext(TransactionRecordContext); }
