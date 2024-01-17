import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {ColumnIndexContext, RowContext} from "../models";

export function useRowContext(): NonNullable<RowContext> { return useContextOrThrow(RowContext); }

export function useColumnIndexContext(): NonNullable<ColumnIndexContext> { return useContextOrThrow(ColumnIndexContext); }
