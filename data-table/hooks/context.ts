import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {DataTableContext} from "../models";

export function useDataTableContext(): NonNullable<DataTableContext> { return useContextOrThrow(DataTableContext); }
