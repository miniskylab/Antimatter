import {ComponentProps, type GestureResponderEventHandler} from "@miniskylab/antimatter-framework";
import {ScrollView} from "@miniskylab/antimatter-scroll-view";
import {View} from "@miniskylab/antimatter-view";
import {RefObject} from "react";
import {Column} from "../classes";
import {Mode} from "../enums";
import {Data} from "../types";
import {Style} from "./style";

export type Props = ComponentProps<Style> & {
    readonly containerRef?: RefObject<View | ScrollView | null>;
    readonly data?: Data;
    readonly columns?: Column[];
    readonly mode?: Mode;
    readonly onPress?: GestureResponderEventHandler;
    readonly onChange?: (newData: Data) => void;
}
