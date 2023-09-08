import {useContext} from "react";
import {NavbarContext} from "../models";

export function useNavbarContext(): NavbarContext { return useContext(NavbarContext); }
