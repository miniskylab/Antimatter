import {ButtonStyle} from "@miniskylab/antimatter-button";
import {ImageStyle, ShadowStyle, Styled} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Props} from "./props";

export type Style = (cardProps: Styled<Props>) => {
    Root?: ViewStyle;
    Content?: ViewStyle;
    HorizontalMargin?: ViewStyle;
    Image?: ImageStyle;
    Icon?: IconStyle;
    Title?: LabelStyle;
    Description?: LabelStyle;
    CtaContainer?: ViewStyle;
    Cta?: ButtonStyle;
    Shadow?: ShadowStyle;
};
