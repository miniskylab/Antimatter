import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {NavButtonStyle} from "@miniskylab/antimatter-nav-button";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (cardProps: WithoutStyle<Props>) => {
    Root: ViewStyle;
    Content: ViewStyle;
    HorizontalMargin: ViewStyle;
    Text: TextStyle;
    CtaContainer: ViewStyle;
    Cta: NavButtonStyle;
};
