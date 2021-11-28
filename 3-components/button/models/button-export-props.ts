import {ComponentExportProps} from "@miniskylab/antimatter-component";
import {IconName} from "@miniskylab/antimatter-icon";
import {ButtonVariant} from "../variants";
import {ButtonComponentProps} from "./button-component-props";
import {ButtonTarget} from "./button-target";

export type ButtonExportProps = ComponentExportProps<ButtonComponentProps, ButtonVariant, {
    readonly icon?: IconName | string;
    readonly target?: ButtonTarget | string;
}>;
