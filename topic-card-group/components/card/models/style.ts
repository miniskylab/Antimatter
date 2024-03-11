import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {NavButtonStyle} from "@miniskylab/antimatter-nav-button";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (cardProps: WithoutStyle<Props>) => {
    Root: ViewStyle;
    Content: ViewStyle;
    HorizontalMargin: ViewStyle;
    Wysiwyg: LabelStyle;
    CtaContainer: ViewStyle;
    Cta: NavButtonStyle;
};
