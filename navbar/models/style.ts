import {Styled} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {NavbarProps} from "./props";

export type NavbarStyle = (navbarProps: Styled<NavbarProps>) => {
    Root?: ViewStyle;
    Icon?: IconStyle;
};
