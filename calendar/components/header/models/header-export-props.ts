import {Export} from "@miniskylab/antimatter/infrastructure";
import {HeaderVariant} from "../variants";
import {HeaderComponentProps} from "./header-component-props";

export type HeaderExportProps = Export<HeaderComponentProps, HeaderVariant>;
