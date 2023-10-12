import {ComponentProps} from "@miniskylab/antimatter-framework";
import {NavButtonProps, NavButtonStyle} from "@miniskylab/antimatter-nav-button";

export type TabData = Omit<NavButtonProps, keyof ComponentProps<NavButtonStyle>>;
