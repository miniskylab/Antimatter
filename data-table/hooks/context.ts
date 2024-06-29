import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {ControlButtonTypeContext, DataTableContext} from "../models";

export function useDataTableContext(): NonNullable<DataTableContext> { return useContextOrThrow(DataTableContext); }

export function useControlButtonTypeContext(): NonNullable<ControlButtonTypeContext> { return useContextOrThrow(ControlButtonTypeContext); }
