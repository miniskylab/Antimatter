import {useContext} from "react";
import {HeaderContext, NavigatorDirectionContext} from "../models";

export function useHeaderContext(): HeaderContext { return useContext(HeaderContext); }

export function useNavigatorDirectionContext(): NavigatorDirectionContext { return useContext(NavigatorDirectionContext); }
