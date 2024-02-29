import {ButtonStyle} from "@miniskylab/antimatter-button";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {LocalAuthenticationFormProps} from "./props";

export type LocalAuthenticationFormStyle = (localAuthenticationFormProps: WithoutStyle<LocalAuthenticationFormProps>) => {
    Root: ViewStyle;
    Title: LabelStyle;
    Subtitle: LabelStyle;
    PromptButton: ButtonStyle;
};
