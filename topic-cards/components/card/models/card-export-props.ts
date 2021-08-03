import {Export} from "antimatter/infrastructures";
import {CardVariant} from "../variants";
import {CardComponentProps} from "./card-component-props";

export type CardExportProps = Export<CardComponentProps, CardVariant>;
