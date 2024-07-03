import {ButtonStyle} from "@miniskylab/antimatter-button";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {InputFieldStyle} from "@miniskylab/antimatter-input-field";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {LoginFormProps} from "./props";
import {LoginFormState} from "./state";

export type LoginFormStyle = (loginFormProps: WithoutStyle<LoginFormProps>, loginFormState: LoginFormState) => {
    Root: ViewStyle;
    Logo: IconStyle;
    Title: TextStyle;
    Subtitle: TextStyle;
    InputField: InputFieldStyle;
    LoginButton: ButtonStyle;
};
