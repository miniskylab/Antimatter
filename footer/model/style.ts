import {OmitStyle} from "@miniskylab/antimatter-framework";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {FooterProps} from "./props";

export type FooterStyle = (footerProps: OmitStyle<FooterProps>) => {
    Root?: LabelStyle
};
