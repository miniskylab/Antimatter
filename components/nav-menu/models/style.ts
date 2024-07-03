import {ButtonStyle} from "@miniskylab/antimatter-button";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {ScrollViewStyle} from "@miniskylab/antimatter-scroll-view";
import {TextStyle} from "@miniskylab/antimatter-text";
import {NavMenuProps} from "./props";

export type NavMenuStyle = (navMenuProps: WithoutStyle<NavMenuProps>) => {
    Root: ScrollViewStyle;
    Category: TextStyle;
    Link: ButtonStyle;
};
