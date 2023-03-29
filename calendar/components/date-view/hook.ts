import {useContext} from "react";
import {DateContext, DateViewContext} from "./model";

export function useDateViewContext(): DateViewContext { return useContext(DateViewContext); }

export function useDateContext(): DateContext { return useContext(DateContext); }
