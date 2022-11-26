import {LabelStyle} from "@miniskylab/antimatter-label";
import {OmitStyle} from "@miniskylab/antimatter-model";
import {FooterProps} from "./props";

export type FooterStyle = (footerProps: OmitStyle<FooterProps>) => {
    Root?: LabelStyle
};
