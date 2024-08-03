import {useContextOrThrow} from "@miniskylab/antimatter-framework";
import {DataListContext} from "../models";

export function useDataListContext(): NonNullable<DataListContext> { return useContextOrThrow(DataListContext); }
