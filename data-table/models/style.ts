import {ButtonStyle} from "@miniskylab/antimatter-button";
import {WithoutStyle} from "@miniskylab/antimatter-framework";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {ScrollViewStyle} from "@miniskylab/antimatter-scroll-view";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Row} from "../components";
import {DataTableProps} from "./props";

export type DataTableStyle = (dataTableProps: WithoutStyle<DataTableProps>) => {
    Root?: ViewStyle;
    ControlPanel?: ViewStyle;
    TitleContainer?: ViewStyle;
    MainTitle?: LabelStyle;
    Subtitle?: LabelStyle;
    ControlButton?: ButtonStyle;
    Scroll?: ScrollViewStyle;
    Hr?: ViewStyle;
    Row?: Row.Style;
};
