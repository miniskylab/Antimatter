import {useContext} from "react";
import {ColumnIndexContext, RowContext} from "../models";

export function useRowContext(): RowContext { return useContext(RowContext); }

export function useColumnIndexContext(): ColumnIndexContext { return useContext(ColumnIndexContext); }
