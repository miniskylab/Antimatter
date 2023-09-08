import {useContext} from "react";
import {NavMenuContext} from "../models";

export function useNavMenuContext(): NavMenuContext { return useContext(NavMenuContext); }
