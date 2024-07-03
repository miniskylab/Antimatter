import {ViewType} from "../enums";
import {TimeFrame} from "./time-frame";

export type View = {
    readonly type: ViewType;
    readonly timeFrame: TimeFrame;
}
