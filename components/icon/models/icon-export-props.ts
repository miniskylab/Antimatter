import {ComponentExportProps} from "@miniskylab/antimatter-component";
import {IconVariant} from "../variants";
import {IconComponentProps} from "./icon-component-props";
import {IconName} from "./icon-name";

export type IconExportProps = ComponentExportProps<IconComponentProps, IconVariant, {
    readonly iconName: IconName | string;
}>;
