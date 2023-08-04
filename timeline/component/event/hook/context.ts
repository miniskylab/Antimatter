import {useContext} from "react";
import {EventContext, RowContext} from "../model";

export function useEventContext(): EventContext { return useContext(EventContext); }

export function useRowContext(): RowContext { return useContext(RowContext); }
