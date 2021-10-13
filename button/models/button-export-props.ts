import {IconName} from "@miniskylab/antimatter/icon";
import {Export} from "@miniskylab/antimatter/infrastructure";
import {ButtonVariant} from "../variants";
import {ButtonComponentProps} from "./button-component-props";
import {ButtonTarget} from "./button-target";

export type ButtonExportProps = Export<ButtonComponentProps, ButtonVariant, {
    readonly icon?: IconName | string;
    readonly target?: ButtonTarget | string;
}>;
