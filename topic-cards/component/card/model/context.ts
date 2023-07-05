import {ComponentContext} from "@miniskylab/antimatter-framework";
import {createContext} from "react";
import {CtaTarget} from "../enum";
import {Props} from "./props";

export const CardContext = createContext<CardContext>({});
export type CardContext = ComponentContext<Props>;

export const CtaTargetContext = createContext<CtaTargetContext>(undefined);
export type CtaTargetContext = CtaTarget;
