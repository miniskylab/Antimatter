import {useContext} from "react";
import {BootstrapEventContext} from "../model";

export function useBootstrapEventContext(): BootstrapEventContext { return useContext(BootstrapEventContext); }
