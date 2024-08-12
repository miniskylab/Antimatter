import {ComponentProps} from "@miniskylab/antimatter-framework";
import type {DateInfo} from "../types";
import {type Style} from "./style";

export class Props extends ComponentProps<Style>
{
    readonly today?: Date;
    readonly data?: DateInfo[][];
    readonly onDatePress?: (date: Date) => void;
}
