import {ButtonStyle} from "@miniskylab/antimatter-button";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {ScrollViewStyle} from "@miniskylab/antimatter-scroll-view";
import {NavMenuProps} from "./props";

export type NavMenuStyle = (navMenuProps: WithoutStyle<NavMenuProps>) => {
    Root?: ScrollViewStyle;
    Category?: LabelStyle;
    Link?: ButtonStyle;
};
