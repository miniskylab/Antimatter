import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {ControlButtonTypeContext, DataTableContext, RowTypeContext} from "../models";

export function useDataTableContext(): NonNullable<DataTableContext> { return useContextOrThrow(DataTableContext); }

export function useRowTypeContext(): NonNullable<RowTypeContext> { return useContextOrThrow(RowTypeContext); }

export function useControlButtonTypeContext(): NonNullable<ControlButtonTypeContext> { return useContextOrThrow(ControlButtonTypeContext); }
