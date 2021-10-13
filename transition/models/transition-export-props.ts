import {Export} from "@miniskylab/antimatter/infrastructure";
import {TransitionVariant} from "../variants";
import {TransitionComponentProps} from "./transition-component-props";

export type TransitionExportProps = Export<TransitionComponentProps, TransitionVariant>;
