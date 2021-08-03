import {Export} from "antimatter/infrastructures";
import {HeaderVariant} from "../variants";
import {HeaderComponentProps} from "./header-component-props";

export type HeaderExportProps = Export<HeaderComponentProps, HeaderVariant>;
