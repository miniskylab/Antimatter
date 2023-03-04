import {OmitStyle} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {ViewStyle} from "react-native";
import {ButtonProps} from "./props";
import {ButtonState} from "./state";

export type ButtonStyle = (buttonProps: OmitStyle<ButtonProps>, buttonState: ButtonState) => {
    Root?: ViewStyle;
    Icon?: IconStyle;
    Label?: LabelStyle;
};
