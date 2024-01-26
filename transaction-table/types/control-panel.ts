import {ControlButton} from "./control-button";
import {ControlButtonType} from "./control-button-type";

type ControlPanelButton = ControlButton & { type?: ControlButtonType; }
export type ControlPanel = {
    pressButton1: ControlPanelButton;
    switchButton: ControlPanelButton;
    pressButton2: ControlPanelButton;
}
