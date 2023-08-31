import {useContext} from "react";
import {ControlButtonTypeContext, DataTableContext, RowTypeContext} from "../model";

export function useDataTableContext(): DataTableContext { return useContext(DataTableContext); }

export function useRowTypeContext(): RowTypeContext { return useContext(RowTypeContext); }

export function useControlButtonTypeContext(): ControlButtonTypeContext { return useContext(ControlButtonTypeContext); }
