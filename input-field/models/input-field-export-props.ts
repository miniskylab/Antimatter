import {Export} from "@miniskylab/antimatter/infrastructures";
import {InputFieldVariant} from "../variants";
import {InputFieldComponentProps} from "./input-field-component-props";

export type InputFieldExportProps = Export<InputFieldComponentProps, InputFieldVariant>;
