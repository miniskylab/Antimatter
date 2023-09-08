import {CompositeTransitionSettings} from "@miniskylab/antimatter-transition";
import {View} from "../types";

export type CalendarState = {
    readonly today: Date;
    readonly view: View;
    readonly transitionSettings: CompositeTransitionSettings;
}
