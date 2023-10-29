import {ButtonStyle} from "@miniskylab/antimatter-button";
import {Styled} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {InputFieldStyle} from "@miniskylab/antimatter-input-field";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {LoginFormProps} from "./props";
import {LoginFormState} from "./state";

export type LoginFormStyle = (loginFormProps: Styled<LoginFormProps>, loginFormState: LoginFormState) => {
    Root?: ViewStyle;
    Logo?: IconStyle;
    Title?: LabelStyle;
    Subtitle?: LabelStyle;
    InputField?: InputFieldStyle;
    LoginButton?: ButtonStyle;
};
