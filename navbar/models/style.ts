import {Styled} from "@miniskylab/antimatter-framework";
import {NavButtonStyle} from "@miniskylab/antimatter-nav-button";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {NavbarProps} from "./props";

export type NavbarStyle = (navbarProps: Styled<NavbarProps>) => {
    Root?: ViewStyle;
    Tab?: NavButtonStyle;
};
