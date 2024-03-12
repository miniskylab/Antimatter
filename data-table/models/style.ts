import {ButtonStyle} from "@miniskylab/antimatter-button";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {ScrollViewStyle} from "@miniskylab/antimatter-scroll-view";
import {TextStyle} from "@miniskylab/antimatter-text";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Row} from "../components";
import {DataTableProps} from "./props";

export type DataTableStyle = (dataTableProps: WithoutStyle<DataTableProps>) => {
    Root: ViewStyle;
    ControlPanel: ViewStyle;
    TitleContainer: ViewStyle;
    MainTitle: TextStyle;
    Subtitle: TextStyle;
    ControlButton: ButtonStyle;
    Scroll: ScrollViewStyle;
    Hr: ViewStyle;
    Row: Row.Style;
};
