import {useContext} from "react";
import {NavbarContext} from "../model";

export function useNavbarContext(): NavbarContext { return useContext(NavbarContext); }
