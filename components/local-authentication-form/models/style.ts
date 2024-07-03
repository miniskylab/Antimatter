import {ButtonStyle} from "@miniskylab/antimatter-button";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {LocalAuthenticationFormProps} from "./props";

export type LocalAuthenticationFormStyle = (localAuthenticationFormProps: WithoutStyle<LocalAuthenticationFormProps>) => {
    Root: ViewStyle;
    Title: TextStyle;
    Subtitle: TextStyle;
    PromptButton: ButtonStyle;
};
