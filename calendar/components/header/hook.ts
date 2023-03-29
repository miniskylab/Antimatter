import {useContext} from "react";
import {NavigatorDirectionContext} from "./model";

export function useNavigatorDirectionContext(): NavigatorDirectionContext { return useContext(NavigatorDirectionContext); }
