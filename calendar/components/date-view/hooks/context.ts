import {useContext} from "react";
import {DateContext, DateViewContext} from "../models";

export function useDateViewContext(): DateViewContext { return useContext(DateViewContext); }

export function useDateContext(): DateContext { return useContext(DateContext); }
