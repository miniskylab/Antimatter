import {useContext} from "react";
import {NavMenuContext} from "../model";

export function useNavMenuContext(): NavMenuContext { return useContext(NavMenuContext); }
