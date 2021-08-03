import {IconName} from "antimatter/icon";
import {Export} from "antimatter/infrastructures";
import {ButtonVariant} from "../variants";
import {ButtonComponentProps} from "./button-component-props";
import {ButtonTarget} from "./button-target";

export type ButtonExportProps = Export<ButtonComponentProps, ButtonVariant, {
    readonly icon?: IconName | string;
    readonly target?: ButtonTarget | string;
}>;
