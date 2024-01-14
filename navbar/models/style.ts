import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {NavButtonStyle} from "@miniskylab/antimatter-nav-button";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {NavbarProps} from "./props";

export type NavbarStyle = (navbarProps: WithoutStyle<NavbarProps>) => {
    Root?: ViewStyle;
    Tab?: NavButtonStyle;
};
