import {Export} from "antimatter/infrastructures";
import {RecordVariant} from "../variants";
import {RecordComponentProps} from "./record-component-props";

export type RecordExportProps = Export<RecordComponentProps, RecordVariant>;
