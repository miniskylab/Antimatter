import {useContext} from "react";
import {FooterContext} from "../models";

export function useFooterContext(): FooterContext { return useContext(FooterContext); }
