import {useContext} from "react";
import {ColumnIndexContext, RowContext} from "../model";

export function useRowContext(): RowContext { return useContext(RowContext); }

export function useColumnIndexContext(): ColumnIndexContext { return useContext(ColumnIndexContext); }
