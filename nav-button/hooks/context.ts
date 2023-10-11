import {useContext} from "react";
import {NavButtonContext} from "../models";

export function useNavButtonContext(): NavButtonContext { return useContext(NavButtonContext); }
