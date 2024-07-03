import {ButtonStyle} from "@miniskylab/antimatter-button";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {NavButtonProps} from "./props";

export type NavButtonStyle = (navButtonProps: WithoutStyle<NavButtonProps>) => ButtonStyle;
