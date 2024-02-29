import {ButtonStyle} from "@miniskylab/antimatter-button";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {LocalAuthenticationPromptProps} from "./props";

export type LocalAuthenticationPromptStyle = (localAuthenticationPromptProps: WithoutStyle<LocalAuthenticationPromptProps>) => {
    Root: ViewStyle;
    Title: LabelStyle;
    Subtitle: LabelStyle;
    PromptButton: ButtonStyle;
};
