import {TimeFrame} from "./time-frame";
import {ViewType} from "./view-type";

export type View = {
    readonly type: ViewType;
    readonly timeFrame: TimeFrame;
}
