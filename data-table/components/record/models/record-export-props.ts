import {Export} from "@miniskylab/antimatter/infrastructure";
import {RecordVariant} from "../variants";
import {RecordComponentProps} from "./record-component-props";

export type RecordExportProps = Export<RecordComponentProps, RecordVariant>;
