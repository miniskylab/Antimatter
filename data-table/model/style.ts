import {ButtonStyle} from "@miniskylab/antimatter-button";
import {Styled} from "@miniskylab/antimatter-framework";
import {LabelStyle} from "@miniskylab/antimatter-label";
import {ScrollViewStyle} from "@miniskylab/antimatter-scroll-view";
import {ViewStyle} from "@miniskylab/antimatter-view";
import {Row} from "../component";
import {DataTableProps} from "./props";

export type DataTableStyle = (dataTableProps: Styled<DataTableProps>) => {
    Root?: ViewStyle;
    ControlPanel?: ViewStyle;
    TitleContainer?: ViewStyle;
    MainTitle?: LabelStyle;
    SubTitle?: LabelStyle;
    ControlButton?: ButtonStyle;
    Scroll?: ScrollViewStyle;
    Hr?: ViewStyle;
    Row?: Row.Style;
    AddNewButton?: ButtonStyle;
};
