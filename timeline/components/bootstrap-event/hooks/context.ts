import {useContext} from "react";
import {BootstrapEventContext} from "../models";

export function useBootstrapEventContext(): BootstrapEventContext { return useContext(BootstrapEventContext); }
