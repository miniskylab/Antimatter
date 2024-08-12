import {ComponentProps} from "@miniskylab/antimatter-framework";
import {DateInfo} from "../types";
import {Style} from "./style";

export type Props = ComponentProps<Style> & {
    readonly today?: Date;
    readonly data?: DateInfo[][];
    readonly onDatePress?: (date: Date) => void;
}
