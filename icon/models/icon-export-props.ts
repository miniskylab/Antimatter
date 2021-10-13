import {Export} from "@miniskylab/antimatter/infrastructure";
import {IconVariant} from "../variants";
import {IconComponentProps} from "./icon-component-props";
import {IconName} from "./icon-name";

export type IconExportProps = Export<IconComponentProps, IconVariant, {
    readonly iconName: IconName | string;
}>;
