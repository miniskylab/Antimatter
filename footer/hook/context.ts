import {useContext} from "react";
import {FooterContext} from "../model";

export function useFooterContext(): FooterContext { return useContext(FooterContext); }
