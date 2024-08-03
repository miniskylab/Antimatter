import {ButtonStyle} from "@miniskylab/antimatter-button";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {IconStyle} from "@miniskylab/antimatter-icon";
import {ScrollViewStyle} from "@miniskylab/antimatter-scroll-view";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {DataListProps} from "./props";

export type DataListStyle = (dataListProps: WithoutStyle<DataListProps>) => {
    Root: ViewStyle;
    DisplayPanel: ViewStyle;
    DisplayIcon: IconStyle;
    DisplayMessage: TextStyle;
    ControlPanel: ViewStyle;
    Button1: ButtonStyle;
    Button2: ButtonStyle;
    Button3: ButtonStyle;
    ItemContainer: ScrollViewStyle;
    TopHr: ViewStyle;
    BottomHr: ViewStyle;
};
